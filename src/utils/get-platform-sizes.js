/* jshint node:true, esversion: 6 */
'use strict';

module.exports = function(platformSizes, platforms) {
  let _platformSizes = [];

  if (platforms.length === 0 || platforms.indexOf('all') > -1) {
    platforms = ['ios', 'android', 'windows', 'blackberry'];
  }

  platforms.forEach((platform) => {
    _platformSizes[platform] = platformSizes[platform];
  });

  return _platformSizes;
};
