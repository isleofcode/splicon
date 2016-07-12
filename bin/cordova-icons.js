#! /usr/bin/env node

/* jshint node:true, esversion: 6 */
'use strict';

//TODO - better opts parsing, allow source/dest

const IconTask      = require('../lib/icon-task');
const chalk         = require('chalk');

(function() {
  const args = process.argv.slice(2);
  console.log(chalk.green(
    `Generating cordova icons for ${args}`
  ));

  IconTask({platforms: args}).then(() => {
    console.log(chalk.green(
      "Done!"
    ));
  });
})();
