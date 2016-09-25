/* jshint node:true, esversion: 6 */
'use strict';

const AbortTask     = require('./utils/abort-task');
const GetPlatSizes  = require('./utils/get-platform-sizes');
const PlatformSizes = require('./platform-icon-sizes');
const SerializeIcon = require('./utils/serialize-icon');
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
      source: 'icon.svg',
      dest: 'res/icon',
      projectPath: './cordova',
      platforms: ['all']
    });

    if (!existsSync(opts.source)) {
      AbortTask(`Source icon ${opts.source} does not exist`);
    }

    if (!ValidPlatform(opts.platforms)) {
      AbortTask(`Platforms ${opts.platforms} are not all valid`);
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
        keyName: 'icon',
        serializeFn: SerializeIcon
      })
    })
    .then(resolve);
  });
};
