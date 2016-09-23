/* jshint node:true, esversion: 6 */
'use strict';

const chalk         = require('chalk');

module.exports = function(msg) {
  console.log(chalk.red(`${msg}. Aborting`));
  process.exit();
}
