const {spawnSync, execSync} = require('child_process');
const {join} = require('path');
const {existsSync} = require('fs');
const featuresPath = join(__dirname, 'features');
const cjet = join(process.cwd(), 'bin/cjet.js');

describe('chanjet-manifest-chunk-plugin', () => {
  beforeAll(() => {
    // cd features and run cjet  build
    execSync(`cd ${featuresPath} && node ${cjet} build`, {encoding: 'utf8'});
  });
  it('should has mainfest.js', () => {
    const dist = filename => join(featuresPath, 'dist', filename);
    expect(existsSync(dist(''))).toBe(true);
    expect(existsSync(dist('mainfest.js'))).toBe(true);
  });
});
