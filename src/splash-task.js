/* jshint node:true, esversion: 6 */
'use strict';

const AbortTask     = require('./utils/abort-task');
const GetPlatSizes  = require('./utils/get-platform-sizes');
const PlatformSizes = require('./platform-splash-sizes');
const SerialSplash  = require('./utils/serialize-splash');
const UpdateConfig  = require('./utils/update-config');
const ValidPlatform = require('./utils/validate-platforms');
const WriteImages   = require('./utils/write-images');

const RSVP          = require('rsvp');
const existsSync    = require('fs').existsSync;
const _defaults     = require('lodash').defaults;

module.exports = function(opts) {
  return new RSVP.Promise((resolve) => {
    if (opts === undefined) opts = {};

    _defaults(opts, {
      source: 'splash.svg',
      dest: 'res/screen',
      projectPath: './cordova',
      platforms: ['all']
    });

    if (!existsSync(opts.source)) {
      AbortTask(`Source splash ${opts.source} does not exist`);
    }

    if (!ValidPlatform(opts.platforms)) {
      AbortTask(`Platforms ${opts.platforms} are not all valid`);
    }

    if (opts.platforms.length === 0 || opts.platforms.indexOf('all') > -1) {
      opts.platforms = ['ios', 'android'];
    }

    const platformSizes = GetPlatSizes(PlatformSizes, opts.platforms);

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
        keyName: 'splash',
        serializeFn: SerialSplash
      })
    })
    .then(resolve);
  });
};
