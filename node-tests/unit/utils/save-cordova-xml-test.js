'use strict';

const expect        = require('../../helpers/expect');

const SaveCdvXML    = require('../../../src/utils/save-cordova-xml');

const fs            = require('fs');
const SerializeIcon = require('../../../src/utils/serialize-icon');

describe('SaveCordovaXML', function() {
  const configFixtureDir = 'node-tests/fixtures/config.xml';
  const tmpConfigPath = 'tmp/config.xml';

  before(() => {
    if (!fs.existsSync('tmp')) fs.mkdirSync('tmp');
  });

  afterEach(() => {
    fs.unlinkSync(tmpConfigPath);
  });

  context('when projectPath, desiredNodes, keyName, and serializeFn', () => {
    const projectPath = 'tmp/';
    const desiredNodes = {
      ios: {
        itemKey: 'width',
        items: [
          { size: 60,  name: 'icon-60', path: 'tmp/ios/icon-60.png' }
        ]
      }
    };
    const keyName = 'icon';
    const serializeFn = SerializeIcon;
    const args = {
      projectPath: projectPath,
      desiredNodes: desiredNodes,
      keyName: keyName,
      serializeFn: serializeFn
    };

    context('when config.xml has no platform nodes', () => {
      before((done) => {
        const fixturePath = `${configFixtureDir}/no-platform-nodes.xml`;
        const fixtureStream = fs.createReadStream(fixturePath);
        const tmpConfigStream = fs.createWriteStream(tmpConfigPath);
        fixtureStream.pipe(tmpConfigStream);
        tmpConfigStream.on('finish', () => { done(); });
      });

      it('it adds the platform node with icon nodes', (done) => {
        SaveCdvXML(args).then(() => {
          const tmpConfig = fs.readFileSync(tmpConfigPath, 'utf8');
          const expectedConfigPath =
            `${configFixtureDir}/no-and-ios-platform-node-expected.xml`;
          const expectedConfig = fs.readFileSync(expectedConfigPath, 'utf8');

          try {
            expect(tmpConfig).to.equal(expectedConfig);
            done();
          } catch(e) {
            done(e);
          }
        }).catch((e) => {
          done(e);
        });
      });
    });

    context('when config.xml has desiredNodes platform', () => {
      before((done) => {
        const fixturePath = `${configFixtureDir}/ios-platform-node.xml`;
        const fixtureStream = fs.createReadStream(fixturePath);
        const tmpConfigStream = fs.createWriteStream(tmpConfigPath);
        fixtureStream.pipe(tmpConfigStream);
        tmpConfigStream.on('finish', () => { done(); });
      });

      it('it replaces the icon nodes', (done) => {
        SaveCdvXML(args).then(() => {
          const tmpConfig = fs.readFileSync(tmpConfigPath, 'utf8');
          const expectedConfigPath =
            `${configFixtureDir}/no-and-ios-platform-node-expected.xml`;
          const expectedConfig = fs.readFileSync(expectedConfigPath, 'utf8');

          try {
            expect(tmpConfig).to.equal(expectedConfig);
            done();
          } catch(e) {
            done(e);
          }
        }).catch((e) => {
          done(e);
        });
      });
    });

    context('when config.xml does not have desiredNodes platform', () => {
      before((done) => {
        const fixturePath = `${configFixtureDir}/android-platform-node.xml`;
        const fixtureStream = fs.createReadStream(fixturePath);
        const tmpConfigStream = fs.createWriteStream(tmpConfigPath);
        fixtureStream.pipe(tmpConfigStream);
        tmpConfigStream.on('finish', () => { done(); });
      });

      it('it adds the platform node with icon nodes', (done) => {
        SaveCdvXML(args).then(() => {
          const tmpConfig = fs.readFileSync(tmpConfigPath, 'utf8');
          const expectedConfigPath =
            `${configFixtureDir}/android-platform-node-expected.xml`;
          const expectedConfig = fs.readFileSync(expectedConfigPath, 'utf8');

          try {
            expect(tmpConfig).to.equal(expectedConfig);
            done();
          } catch(e) {
            done(e);
          }
        }).catch((e) => {
          done(e);
        });
      });
    });
  });
});
