/* jshint node:true, esversion: 6 */
'use strict';

const _filter       = require('lodash').filter;
const ALLOWED_PLATFORMS = [
  'all',
  'ios',
  'android',
  'blackberry',
  'windows'
];

module.exports = function(platforms) {
  const invalidPlatforms = _filter(platforms, (item) => {
    return ALLOWED_PLATFORMS.indexOf(item) === -1;
  });

  return invalidPlatforms.length === 0;
};
