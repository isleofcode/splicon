/* jshint node:true, esversion: 6 */
'use strict';

const _get          = require('lodash').get;

module.exports = function makeDir(platform, projectPath, iconData) {
  let props = { src: iconData.src };

  if (platform === 'ios') {
    props.height = iconData.size;
    props.width = iconData.size;
  } else if (platform === 'android') {
    props.density = iconData.name;
  } else if (platform === 'windows') {
    const target = _get(iconData, 'attrs.target', iconData.name);
    props.target = target;
  }

  return props;
};

