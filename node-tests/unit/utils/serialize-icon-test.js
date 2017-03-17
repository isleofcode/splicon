'use strict';

const expect        = require('../../helpers/expect');

const SerializeIcon = require('../../../src/utils/serialize-icon');

describe('SerializeIcon', () => {
  context('when platform is iOS', () => {
    it('returns an object with path, width, and height', () => {
      const platform = 'ios';
      const projectPath = '';
      const iconData = { path: 'foo', size: 180 };

      const props = SerializeIcon(platform, projectPath, iconData);

      expect(props.src).to.equal(iconData.path);
      expect(props.width).to.equal(iconData.size.toString());
      expect(props.height).to.equal(iconData.size.toString());
    });
  });

  context('when platform is Android', () => {
    it('returns an object with path and density', () => {
      const platform = 'android';
      const projectPath = '';
      const iconData = { path: 'foo', name: 'xxxhdpi' };

      const props = SerializeIcon(platform, projectPath, iconData);

      expect(props.src).to.equal(iconData.path);
      expect(props.density).to.equal(iconData.name);
    });
  });

  context('when platform is Windows', () => {
    const platform = 'windows';
    const projectPath = '';

    context('when icon data includes name and target', () => {
      it('returns an object with path and target as target', () => {
        const iconData = {
          path: 'foo',
          name: 'smalllogo',
          attrs: {
            target: 'Square30x30Logo'
          }
        };

        const props = SerializeIcon(platform, projectPath, iconData);

        expect(props.src).to.equal(iconData.path);
        expect(props.target).to.equal(iconData.attrs.target);
      });
    })

    context('when icon data includes name and not target', () => {
      it('returns an object with path and name as target', () => {
        const iconData = { path: 'foo', name: 'smalllogo' };

        const props = SerializeIcon(platform, projectPath, iconData);

        expect(props.src).to.equal(iconData.path);
        expect(props.target).to.equal(iconData.name);
      });
    })
  });
});
