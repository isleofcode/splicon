#! /usr/bin/env node

/* jshint node:true, esversion: 6 */
'use strict';

//TODO - better opts parsing, allow source/dest

const SplashTask    = require('../lib/splash-task');
const chalk         = require('chalk');

(function() {
  const args = process.argv.slice(2);
  console.log(chalk.green(
    `Generating cordova splashes for ${args}`
  ));

  SplashTask({platforms: args}).then(() => {
    console.log(chalk.green(
      "Done!"
    ));
  });
})();
