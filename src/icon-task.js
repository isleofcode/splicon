/* jshint node:true, esversion: 6 */
'use strict';

const DefaultIcons  = require('./default-icons');
const WriteImages   = require('./utils/write-images');
const UpdateConfig  = require('./utils/update-config');
const MakeDir       = require('./utils/make-dir');
const SerializeIcon = require('./utils/serialize-icon');
const ValidPlatform = require('./utils/validate-platforms');

const RSVP          = require('rsvp');
const chalk         = require('chalk');
const existsSync    = require('fs').existsSync;
const _defaults     = require('lodash').defaults;

const getPlatformSizes = function(platforms) {
  let platformSizes = [];

  if (platforms.length === 0 || platforms.indexOf('all') > -1) {
    platforms = ['ios', 'android', 'windows', 'blackberry'];
  }

  platforms.forEach((platform) => {
    platformSizes[platform] = DefaultIcons[platform];
  });

  return platformSizes;
};

const abort = function(msg) {
  console.log(chalk.red(`${msg}. Aborting`));
  process.exit();
}

module.exports = function(opts) {
  return new RSVP.Promise((resolve) => {
    if (opts === undefined) opts = {};

    _defaults(opts, {
      source: 'icon.svg',
      dest: 'res/icon',
      projectPath: './cordova',
      platforms: ['all']
    });

    if (!existsSync(opts.source)) {
      abort(`Source icon ${opts.source} does not exist`);
    }

    if(!ValidPlatform(opts.platforms)) {
      abort(`Platforms ${opts.platforms} are not all valid`);
    }

    const platformSizes = getPlatformSizes(opts.platforms);

    WriteImages({
      source: opts.source,
      projectPath: opts.projectPath,
      dest: opts.dest,
      platformSizes: platformSizes
    })
    .then((updatedPlatformSizes) => {
      UpdateConfig({
        projectPath: opts.projectPath,
        desiredNodes: updatedPlatformSizes,
        keyName: 'icon',
        serializeFn: SerializeIcon
      })
    })
    .then(resolve);
  });
};
