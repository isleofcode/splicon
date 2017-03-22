'use strict';

const expect        = require('../../helpers/expect');

const SerializeSplash = require('../../../src/utils/serialize-splash');

describe('SerializeSplash', () => {
  context('when platform is iOS', () => {
    it('returns an object with id, path, width, and height', () => {
      const platform = 'ios';
      const projectPath = '';
      const iconData = {
        path: 'foo',
        width: 1536,
        height: 2048,
        id: '1536-2048'
      };

      const props = SerializeSplash(platform, projectPath, iconData);

      expect(props.id).to.equal(iconData.id);
      expect(props.src).to.equal(iconData.path);
      expect(props.width).to.equal(iconData.width.toString());
      expect(props.height).to.equal(iconData.height.toString());
    });
  });

  context('when platform is Android', () => {
    it('returns an object with id, path, and density', () => {
      const platform = 'android';
      const projectPath = '';
      const iconData = {
        path: 'foo',
        width: 1920,
        height: 1280,
        id: 'land-xxxhdpi'
      };

      const props = SerializeSplash(platform, projectPath, iconData);

      expect(props.id).to.equal(iconData.id);
      expect(props.src).to.equal(iconData.path);
      expect(props.density).to.equal(iconData.id);
    });
  });
});
