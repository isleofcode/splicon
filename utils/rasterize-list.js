/* jshint node:true, esversion: 6 */
'use strict';

const fs            = require("fs");
const RSVP          = require('rsvp');
const svg2png       = require('svg2png');

module.exports = function (options) {
  return new RSVP.Promise((resolve) => {
    let buffer = fs.readFileSync(options.src);
    let rasterizeTasks = [];

    options.toRasterize.forEach((rasterize) => {
      let width, height;
      if (rasterize.size) {
        width = rasterize.size;
        height = rasterize.size;
      } else {
        width = rasterize.width;
        height = rasterize.height;
      }

      let rasterizeTask = svg2png(buffer, { width: width, height: height })
      .then((pngBuffer) => {
        fs.writeFileSync(rasterize.path, pngBuffer);
      });

      rasterizeTasks.push(rasterizeTask);
    });

    RSVP.all(rasterizeTasks).then(resolve);
  });
};
