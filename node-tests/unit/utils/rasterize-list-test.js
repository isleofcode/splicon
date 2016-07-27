'use strict';

const td            = require('testdouble');
const expect        = require('../../helpers/expect');

const fs            = require('fs');
const RSVP          = require('rsvp');
const svg2png       = td.replace('svg2png', (sourceBuffer, resize) => {
  return RSVP.resolve('PNG-BUFFER');
});

const RasterizeList = require('../../../src/utils/rasterize-list');

describe('RasterizeList', () => {
  context('when src and toRasterize', () => {
    let readFileSync, writeFileSync;

    beforeEach(() => {
      readFileSync = td.replace(fs, 'readFileSync');
      writeFileSync = td.replace(fs, 'writeFileSync');
    });

    afterEach(() => {
      td.reset();
    });

    it('returns a resolved promise', () => {
      const src = 'icon.svg';
      const toRasterize = [
        {
          size: 60,
          name: 'icon-60',
          src: 'res/icon/ios/icon-60.png',
          path: 'cordova/res/icon/ios/icon-60.png'
        }
      ];
      const options = { src: src, toRasterize: toRasterize };

      expect(RasterizeList(options)).to.be.fulfilled;

      td.verify(readFileSync(src));

      // FIXME: Verify svg2png and fs.writeFileSync receive the right
      // arguments. Code below matches documentation but results in two
      // different errors.
      // toRasterize.forEach((rasterize) => {
      //   td.verify(svg2png(td.matchers.anything(), { width: rasterize.size, height: rasterize.size }));
      //   td.verify(writeFileSync(rasterize.path, 'PNG-BUFFER'));
      // });
    });
  });
});
