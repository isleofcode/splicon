/* jshint node:true, esversion: 6 */
'use strict';

const MakeDir       = require('./make-dir');
const fs            = require('fs');
const RSVP          = require('rsvp');
const svg2png       = require('../../vendor/svg2png/svg2png');
const normalizePath = require('path').normalize;
const _forOwn       = require('lodash').forOwn;
const _union        = require('lodash').union;

module.exports = function (opts) {
  return new RSVP.Promise((resolve) => {
    let buffer = fs.readFileSync(opts.source);
    let rasterizeTasks = [];
    let rasterizeQueue = [];

    _forOwn(opts.platformSizes, (icons, platform) => {
      MakeDir('./', `${opts.projectPath}/${opts.dest}/${platform}`);

      icons.items.map((item) => {
        item.path = `${opts.dest}/${platform}/${item.name}.png`;
      });

      rasterizeQueue = _union(rasterizeQueue, icons.items);
    });

    rasterizeQueue.forEach((rasterize) => {
      const width = rasterize.size;
      const height = rasterize.size;

      let rasterizeTask = svg2png(buffer, { width: width, height: height })
      .then((pngBuffer) => {
        const writePath = `${opts.projectPath}/${rasterize.path}`;
        fs.writeFileSync(normalizePath(writePath), pngBuffer)
      })

      rasterizeTasks.push(rasterizeTask);
    });

    RSVP.all(rasterizeTasks).then(() => {
      resolve(opts.platformSizes)
    });
  });
};
