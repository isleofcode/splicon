/* jshint node:true, esversion: 6 */
'use strict';

const DefaultIcons  = require('../lib/default-icons');
const RasterizeList = require('../utils/rasterize-list');
const SaveCdvXML    = require('../utils/save-cordova-xml');
const MakeDir       = require('../utils/make-dir');
const SerializeIcon = require('../utils/serialize-icon');
const ValidPlatform = require('../utils/validate-platforms');

const RSVP          = require('rsvp');
const chalk         = require('chalk');
const existsSync    = require('fs').existsSync;
const normalizePath = require('path').normalize;
const _defaults     = require('lodash').defaults;
const _forOwn       = require('lodash').forOwn;
const _union        = require('lodash').union;

const getIcons = function(platforms) {
  let targets = [];

  if (platforms.length === 0 || platforms.indexOf('all') > -1) {
    platforms = ['ios', 'android', 'windows', 'blackberry'];
  }

  platforms.forEach((platform) => {
    targets[platform] = DefaultIcons[platform];
  });

  return targets;
};

module.exports = function(opts) {
  return new RSVP.Promise((resolve) => {
    if (opts === undefined) opts = {};

    _defaults(opts, {
      source: 'icon.svg',
      dest: 'res/icon',
      projectPath: './cordova',
      platforms: ['all']
    });
    let destPath = `${opts.projectPath}/${opts.dest}`;

    if (!existsSync(opts.source)) {
      console.log(chalk.red(
        `Source icon ${opts.source} does not exist. Aborting`
      ));
      process.exit();
    }

    if (!existsSync(destPath)) {
      console.log(chalk.yellow(
        `dest path ${destPath} does not exist. creating it for you`
      ));
      MakeDir('./', destPath);
    }

    if(!ValidPlatform(opts.platforms)) {
      console.log(chalk.red(
        `Platforms ${opts.platforms} are not all valid. Aborting`
      ));
      process.exit();
    }

    const targetIcons = getIcons(opts.platforms);
    let rasterizeQueue = [];

    _forOwn(targetIcons, (icons, platform) => {
      MakeDir('./', `${destPath}/${platform}`);

      icons.items.map((item) => {
        item.src = `${opts.dest}/${platform}/${item.name}.png`;
        item.path = normalizePath(`${opts.projectPath}/${item.src}`);
      });
      rasterizeQueue = _union(rasterizeQueue, icons.items);
    });

    RasterizeList({
      src: opts.source,
      toRasterize: rasterizeQueue
    })
    .then(SaveCdvXML({
      projectPath: opts.projectPath,
      desiredNodes: targetIcons,
      keyName: 'icon',
      serializeFn: SerializeIcon
    }))
    .then(resolve);
  });
};
