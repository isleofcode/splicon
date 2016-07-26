'use strict';

const td            = require('testdouble');

const MakeDir       = require('../../../src/utils/make-dir');

const fs            = require('fs');
const path          = require('path');

describe('MakeDir', () => {
  context('when base and destPath', () => {
    afterEach(() => {
      td.reset();
    });

    it('makes the directory', () => {
      var mkdirSync = td.replace(fs, 'mkdirSync');

      let base = './';
      const destPath = 'foo/bar';

      MakeDir(base, destPath);

      // Verify replaced property was invoked.
      destPath.split('/').forEach((segment) => {
        base = path.join(base, segment);

        td.verify(mkdirSync(base));
      });
    });
  });
});
