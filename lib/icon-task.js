/* jshint node:true, esversion: 6 */
'use strict';

const DefaultIcons  = require('../lib/default-icons');
const RasterizeList = require('../utils/rasterize-list');
const SaveCdvXML    = require('../utils/save-cordova-xml');
const MakeDir       = require('../utils/make-dir');
const SerializeIcon = require('../utils/serialize-icon');

const RSVP          = require('rsvp');
const chalk         = require('chalk');
const existsSync    = require('fs').existsSync;
const _defaults     = require('lodash').defaults;
const _forOwn       = require('lodash').forOwn;
const _union        = require('lodash').union;

const getIcons = function(platforms) {
  let targets = [];

  if (platforms.length === 0 || platforms.indexOf('all') > -1) {
    platforms = ['ios', 'android', 'windows', 'blackberry']
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
      dest: './cordova/res/icons',
      projectPath: './cordova',
      platforms: ['all']
    });

    if (!existsSync(opts.source)) {
      console.log(chalk.red(
        `Source icon ${opts.source} does not exist. Aborting`
      ));
      process.exit();
    }

    if (!existsSync(opts.dest)) {
      console.log(chalk.yellow(
        `dest path ${opts.dest} does not exist. creating it for you`
      ));
      MakeDir('./', opts.dest);
    }

    const targetIcons = getIcons(opts.platforms);
    let rasterizeQueue = [];

    _forOwn(targetIcons, (icons, platform) => {
      MakeDir('./', `${opts.dest}/${platform}`);
      rasterizeQueue = _union(rasterizeQueue, icons);
    });

    RasterizeList({
      src: opts.source,
      dest: opts.dest,
      toRasterize: rasterizeQueue
    })
    .then(SaveCdvXML({
      projectPath: opts.projectPath,
      desiredNodes: targetIcons,
      keyName: 'icon',
      serializeFn: SerializeIcon
    }))
    .then(resolve)
  });
};
