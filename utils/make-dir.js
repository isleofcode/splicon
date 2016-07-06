/* jshint node:true, esversion: 6 */
'use strict';

const path          = require("path");
const fs            = require("fs");

module.exports = function makeDir(base, destPath) {
  destPath = destPath.split("/");
  destPath.forEach((segment) => {
    if (segment) {
      base = path.join(base, segment);
      try {
        fs.mkdirSync(base);
      } catch (e) {
        if (e.code !== "EEXIST") {
          throw e;
        }
      }
    }
  });
};
