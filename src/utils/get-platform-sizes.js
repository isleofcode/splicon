/* jshint node:true, esversion: 6 */
'use strict';

module.exports = function(platformSizes, platforms) {
  let _platformSizes = [];

  platforms.forEach((platform) => {
    _platformSizes[platform] = platformSizes[platform];
  });

  return _platformSizes;
};
