'use strict';

const expect        = require('../helpers/expect');

const IconTask      = require('../../src/icon-task');

const fs            = require('fs');
const sizeOf        = require('image-size');
const parseString   = require('xml2js').parseString;
const _find         = require('lodash').find;
const DefaultIcons  = require('../../src/default-icons');

describe('IconTask', function() {
  // Hitting the file system is slow
  this.timeout(0);

  const fixturePath = 'node-tests/fixtures/config.xml';
  const tmpConfigPath = 'tmp/config.xml'
  const tmpFixturePath = 'tmp/config.xml';

  const svgPath = 'node-tests/fixtures/icon.svg';
  const pngPath = 'icons';
  const projectPath = 'tmp';

  before((done) => {
    if (!fs.existsSync('tmp')) fs.mkdirSync('tmp');

    const fixtureStream = fs.createReadStream(`${fixturePath}/no-platform-nodes.xml`);
    const tmpFixtureStream = fs.createWriteStream(tmpFixturePath);
    fixtureStream.pipe(tmpFixtureStream);

    tmpFixtureStream.on('finish', () => {
      done();
    });
  });

  after(() => {
    fs.unlinkSync(tmpConfigPath);
  });

  context('when platforms', () => {
    context('when ios', () => {
      const platform = 'ios';
      const platformSizes = DefaultIcons[platform];
      let task;

      before(() => {
        task = IconTask({
          source: svgPath,
          dest: pngPath,
          projectPath: projectPath,
          platforms: [platform]
        })
      });

      after(() => {
        platformSizes.items.forEach((size) => {
          const path = `${projectPath}/${pngPath}/${platform}/${size.name}.png`;
          fs.unlinkSync(path);
        });
        fs.rmdirSync(`${projectPath}/${pngPath}/${platform}`);
        fs.rmdirSync(`${projectPath}/${pngPath}`);
      });

      it('generates the icons', (done) => {
        task.then(() => {
          try {
            platformSizes.items.forEach((size) => {
              const path = `${projectPath}/${pngPath}/${platform}/${size.name}.png`;

              expect(fs.existsSync(path)).to.equal(true);
              expect(sizeOf(path).width).to.equal(size.size);
              expect(sizeOf(path).height).to.equal(size.size);
            });
            done();
          } catch(e) {
            done(e);
          }
        });
      });

      it('updates config.xml', (done) => {
        task.then(() => {
          const configXML = fs.readFileSync(tmpConfigPath, 'utf8');

          try {
            parseString(configXML, (err, config) => {
              if (err) done(err);

              const platformNode = _find(config.widget.platform, (node) => {
                return node.$.name == platform;
              });

              expect(platformNode).to.exist;

              const iconsAttrs = platformNode.icon.map((iconNode) => {
                return iconNode.$;
              });

              platformSizes.items.forEach((size) => {
                const attrs = {
                  src: `${pngPath}/${platform}/${size.name}.png`,
                  height: size.size.toString(),
                  width: size.size.toString()
                }

                expect(iconsAttrs).to.include(attrs);
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
