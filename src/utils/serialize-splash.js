/* jshint node:true, esversion: 6 */
'use strict';

const _get          = require('lodash').get;

module.exports = function (platform, projectPath, iconData) {
  let props = {
    id: iconData.id,
    src: iconData.path
  };

  if (platform === 'ios') {
    props.width = iconData.width.toString();
    props.height = iconData.height.toString();
  } else if (platform === 'android') {
    props.density = iconData.id;
  }

  return props;
};
