/* jshint node:true, esversion: 6 */
'use strict';

const _get          = require('lodash').get;

module.exports = function (platform, projectPath, iconData) {
  let props = { src: iconData.path };

  if (platform === 'ios') {
    props.width = iconData.width;
    props.height = iconData.height;
  } else if (platform === 'android') {
    props.density = iconData.name;
  }

  return props;
};
