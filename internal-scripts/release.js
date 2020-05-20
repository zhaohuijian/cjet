const args = require('minimist')(process.argv.slice(2));
const fs = require('fs');
const path = require('path');
const semver = require('semver');
const currentVersion = require('../package.json').version;
const {prompt} = require('enquirer');
const execa = require('execa');

const preId = args.preid || (semver.prerelease(currentVersion) && semver.prerelease(currentVersion)[0]) || 'alpha';
const isDryRun = args.dry;
const skipTests = args.skipTests;

const versionIncrements = ['patch', 'minor', 'major', 'prepatch', 'preminor', 'premajor', 'prerelease'];

const inc = i => semver.inc(currentVersion, i, preId);
const bin = name => path.resolve(__dirname, '../node_modules/.bin/' + name);
const run = (bin, args, opts = {}) => execa(bin, args, {stdio: 'inherit', ...opts});

const logInfo = console.log;

async function main() {
  let targetVersion = args._[0];

  targetVersion = await getTargetVersion(targetVersion);

  validVersion();

  const {yes} = await confirm(targetVersion);

  if (!yes) {
    return;
  }

  // run tests before release
  !skipTests && (await runTest());

  // update all package versions and inter-dependencies
  updateVersions(targetVersion);

  // all good...
  if (isDryRun) {
    // stop here so we can inspect changes to be committed
    // and packages built
    return console.log('Dry run finished.');
  }
  // update changelog
  console.log('update changelog...');
  await updateChangelog();

  // commit all changes
  await commitAll();

  // publish packages
  // await publishNpm();

  // push to GitHub
  logInfo('Push to GitHub...');
  await gitPushOriginWithTag();

  function validVersion() {
    if (!semver.valid(targetVersion)) {
      throw new Error(`invalid target version: ${targetVersion}`);
    }
  }

  async function runTest() {
    await run(bin('jest'), ['--clearCache']);
    await run('yarn', ['test']);
  }

  async function updateChangelog() {
    await run('yarn', ['run', 'changelog', targetVersion]);
  }

  async function gitPushOriginWithTag() {
    await run('git', ['tag', `v${targetVersion}`]);
    await run('git', ['push', 'origin', `refs/tags/v${targetVersion}`]);
    await run('git', ['push']);
  }

  async function commitAll() {
    console.log('Committing changes...');
    await run('git', ['add', '-A']);
    await run('git', ['commit', '-m', `release: v${targetVersion}`]);
  }
}

async function confirm(targetVersion) {
  return await prompt({
    type: 'confirm',
    name: 'yes',
    message: `Releasing v${targetVersion}. Confirm?`,
  });
}

async function getTargetVersion(targetVersion) {
  if (!targetVersion) {
    // no explicit version, offer suggestions
    const {release} = await prompt({
      type: 'select',
      name: 'release',
      message: 'Select release type',
      choices: versionIncrements.map(i => `${i} (${inc(i)})`).concat(['custom']),
    });
    if (release === 'custom') {
      targetVersion = (
        await prompt({
          type: 'input',
          name: 'version',
          message: 'Input custom version',
          initial: currentVersion,
        })
      ).version;
    } else {
      targetVersion = release.match(/\((.*)\)/)[1];
    }
  }
  return targetVersion;
}

function updateVersions(version) {
  console.log('Updating versions...');
  // 1. update root package.json
  updatePackage(path.resolve(__dirname, '..'), version);
}

function updatePackage(pkgRoot, version) {
  const pkgPath = path.resolve(pkgRoot, 'package.json');
  const pkg = readPkg(pkgRoot);
  pkg.version = version;
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
}

function readPkg(pkgRoot) {
  const pkgPath = path.resolve(pkgRoot, 'package.json');
  return JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
}

main().catch(err => {
  console.error(err);
});
