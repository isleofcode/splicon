#! /usr/bin/env node

/* jshint node:true, esversion: 6 */
'use strict';

//TODO - better opts parsing, allow source/dest

const IconTask      = require('../lib/icon-task');
const chalk         = require('chalk');
const _filter       = require('lodash').filter;

const ALLOWED_PLATFORMS = ['all', 'ios', 'android', 'blackberry', 'windows'];

(function() {
  const args = process.argv.slice(2);
  console.log(chalk.green(
    `Generating cordova icons for ${args}`
  ));

  const invalidPlatforms = _filter(args, (item) => {
    return ALLOWED_PLATFORMS.indexOf(item) === -1;
  });

  if (invalidPlatforms.length > 0) {
    console.log(chalk.red(
      `Platforms ${invalidPlatforms} do not match ${ALLOWED_PLATFORMS}. Aborting`
    ));
    process.exit();
  }

  IconTask({platforms: args}).then(() => {
    console.log(chalk.green(
      "Done!"
    ));
  });
})();
