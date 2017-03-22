/* jshint node:true, esversion: 6 */
'use strict';

const _get          = require('lodash').get;

module.exports = function (platform, projectPath, iconData) {
  let props = {
    id: iconData.id,
    src: iconData.path
  };

  if (platform === 'ios') {
    props.height = iconData.size.toString();
    props.width = iconData.size.toString();
  } else if (platform === 'android') {
    props.density = iconData.id;
  } else if (platform === 'windows') {
    const target = _get(iconData, 'attrs.target', iconData.id);
    props.target = target;
  }

  return props;
};

