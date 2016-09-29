'use strict';

/* global phantom: true */

var webpage         = require('webpage');
var system          = require('system');

if (system.args.length !== 2) {
  console.error('Usage: converter.js resize');
  phantom.exit();
} else {
  convert(system.args[1]);
}

function convert(resize) {
  var page = webpage.create();
  var sourceBase64 = system.stdin.readLine();

  page.open('data:image/svg+xml;base64,' + sourceBase64, function (status) {
    if (status !== 'success') {
      console.error('Unable to load the source file.');
      phantom.exit();
      return;
    }

    try {
      resize = JSON.parse(resize);

      var cropRequired = resize.width !== resize.height;

      if (cropRequired) {
        var crop = { width: resize.width, height: resize.height };
        var maxDimension = crop.width > crop.height ? 'width' : 'height';
        var maxDimensionSize = crop[maxDimension];
        resize.width = maxDimensionSize;
        resize.height = maxDimensionSize;
      }

      setSVGDimensions(page, resize.width, resize.height);

      page.viewportSize = {
        width: resize.width,
        height: resize.height
      };

      if (cropRequired) {
        var top, left;

        if (maxDimension == 'width') {
          top = (resize.height - crop.height) / 2;
          left = 0;
        } else {
          top = 0;
          left = (resize.width - crop.width) / 2;
        }

        page.clipRect = {
          top: top,
          left: left,
          width: crop.width,
          height: crop.height
        };
      }
    } catch (e) {
      console.error('Unable to set dimensions.');
      console.error(e);
      phantom.exit();
      return;
    }

    var result = 'data:image/png;base64,' + page.renderBase64('PNG');
    system.stdout.write(result);
    phantom.exit();
  });
}

function setSVGDimensions(page, width, height) {
  return page.evaluate(function (width, height) {
    /* global document: true */
    var el = document.documentElement;
    el.setAttribute('width', width + 'px');
    el.setAttribute('height', height + 'px');
  }, width, height);
}
