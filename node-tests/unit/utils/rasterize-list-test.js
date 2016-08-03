'use strict';

const expect        = require('../../helpers/expect');
const fs            = require('fs');
const sizeOf        = require('image-size');

const RasterizeList = require('../../../src/utils/rasterize-list');

describe('RasterizeList', function() {
  // Hitting the file system is slow
  this.timeout(0);

  context('when src and toRasterize', () => {
    const src = 'node-tests/fixtures/icon.svg';
    const toRasterize = [
      {
        size: 60,
        name: 'icon-60',
        path: 'tmp/icon-60.png'
      }
    ];
    let subject;

    before(() => {
      subject = RasterizeList({src: src, toRasterize: toRasterize});
    });

    after(() => {
      toRasterize.forEach((rasterize) => {
        fs.unlinkSync(rasterize.path);
      });
    });

    it('returns a promise that resolves to an array', (done) => {
      expect(subject).to.eventually.be.a('array').notify(done);
    });

    it('writes the files to rasterize at the right size', (done) => {
      subject.then(() => {
        try {
          toRasterize.forEach((rasterize) => {
            expect(fs.existsSync(rasterize.path)).to.equal(true);
            expect(sizeOf(rasterize.path).width).to.equal(rasterize.size);
            expect(sizeOf(rasterize.path).height).to.equal(rasterize.size);
          });
          done();
        } catch(e) {
          done(e);
        }
      });
    });
  });
});
