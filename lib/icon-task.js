/* jshint node:true, esversion: 6 */
'use strict';

const DefaultIcons  = require('../lib/default-icons');
const RasterizeList = require('../utils/rasterize-list');
const SaveCdvXML    = require('../utils/save-cordova-xml');
const MakeDir       = require('../utils/make-dir');

const RSVP          = require('rsvp');
const chalk         = require('chalk');
const existsSync    = require('fs').existsSync;
const _defaults     = require('lodash').defaults;
const _forOwn       = require('lodash').forOwn;
const _union        = require('lodash').union;

const getIcons = function(platforms) {
  if (platforms.length === 0 || platforms.indexOf('all') > -1) {
    return DefaultIcons;
  } else {
    let targets = [];
    platforms.forEach((platform) => {
      targets[platform] = DefaultIcons[platform];
    });
    return targets;
  }
};

const serializeIconFn = function(platform, iconData) {
  if (!iconData.src) {
    console.log(chalk.red(
      `No src found for icon ${iconData.name}. Aborting`
    ));
    process.exit();
  }

  let props = {src: iconData.src};
  if (platform === 'ios') {
    props.height = iconData.size;
    props.width = iconData.size;
  } else if (platform === 'android') {
    props.density = iconData.name;
  } else if (platform === 'windows') {
    props.target = iconData.name;
  }

  return props;
};

module.exports = function(opts) {
  return new RSVP.Promise((resolve) => {
    if (opts === undefined) opts = {};

    _defaults(opts, {
      source: 'icon.svg',
      dest: 'cordova/res/icons',
      platforms: {all: true}
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

      icons.map((icon) => {
         return icon.src = `${opts.dest}/${platform}/${icon.name}.png`;
      });

      rasterizeQueue = _union(rasterizeQueue, icons);
    });

    RasterizeList({
      src: opts.source,
      dest: opts.dest,
      toRasterize: rasterizeQueue
    }).then(() => {
      SaveCdvXML(targetIcons, 'icon', serializeIconFn);
    }).then(resolve);
  });
};
