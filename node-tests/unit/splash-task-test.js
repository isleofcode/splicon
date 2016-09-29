'use strict';

const expect        = require('../helpers/expect');

const SplashTask    = require('../../src/splash-task');

const fs            = require('fs');
const sizeOf        = require('image-size');
const parseString   = require('xml2js').parseString;
const _find         = require('lodash').find;
const PlatformSizes = require('../../src/platform-splash-sizes');

describe('SplashTask', function() {
  // Hitting the file system is slow
  this.timeout(0);

  const configFixtureDir = 'node-tests/fixtures/config.xml';
  const tmpConfigPath = 'tmp/config.xml';

  const svgPath = 'node-tests/fixtures/splash.svg';
  const pngPath = 'splashes';
  const projectPath = 'tmp';

  before((done) => {
    if (!fs.existsSync('tmp')) fs.mkdirSync('tmp');

    const fixturePath = `${configFixtureDir}/no-platform-nodes.xml`;
    const fixtureStream = fs.createReadStream(fixturePath);
    const tmpConfigStream = fs.createWriteStream(tmpConfigPath);
    fixtureStream.pipe(tmpConfigStream);
    tmpConfigStream.on('finish', () => done());
  });

  after(() => {
    fs.unlinkSync(tmpConfigPath);
  });

  context('when platforms', () => {
    context('when ios', () => {
      const platform = 'ios';
      const platformSizes = PlatformSizes[platform];
      let task;

      before(() => {
        task = SplashTask({
          source: svgPath,
          dest: pngPath,
          projectPath: projectPath,
          platforms: [platform]
        })
      });

      after(() => {
        platformSizes.sizes.forEach((size) => {
          const path =
            `${projectPath}/${pngPath}/${platform}/${size.name}.png`;
          fs.unlinkSync(path);
        });
        fs.rmdirSync(`${projectPath}/${pngPath}/${platform}`);
        fs.rmdirSync(`${projectPath}/${pngPath}`);
      });

      it('writes the splashes', (done) => {
        task.then(() => {
          try {
            platformSizes.sizes.forEach((size) => {
              const path =
                `${projectPath}/${pngPath}/${platform}/${size.name}.png`;

              expect(fs.existsSync(path)).to.equal(true);
              expect(sizeOf(path).width).to.equal(size.width);
              expect(sizeOf(path).height).to.equal(size.height);
            });
            done();
          } catch(e) {
            done(e);
          }
        });
      });

      it('updates config.xml', (done) => {
        task.then(() => {
          const configFile = fs.readFileSync(tmpConfigPath, 'utf8');

          try {
            parseString(configFile, (err, config) => {
              if (err) done(err);

              const platformNode = _find(config.widget.platform, (node) => {
                return node.$.name == platform;
              });

              expect(platformNode).to.exist;

              const splashesAttrs = platformNode.splash.map((splashNode) => {
                return splashNode.$;
              });

              platformSizes.sizes.forEach((size) => {
                const attrs = {
                  src: `${pngPath}/${platform}/${size.name}.png`,
                  height: size.height.toString(),
                  width: size.width.toString()
                }

                expect(splashesAttrs).to.include(attrs);
              });
            });
            done();
          } catch(e) {
            done(e);
          }
        });
      });

      it('returns a promise', (done) => {
        expect(task).to.be.fulfilled.notify(done);
      });
    });
  });
});
