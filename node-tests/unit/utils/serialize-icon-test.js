'use strict';

const expect        = require('../../helpers/expect');

const SerializeIcon = require('../../../src/utils/serialize-icon');

describe('SerializeIcon', () => {
  context('when platform is iOS', () => {
    it('returns an object with id, path, width, and height', () => {
      const platform = 'ios';
      const projectPath = '';
      const iconData = { path: 'foo', size: 180, id: 'foo' };

      const props = SerializeIcon(platform, projectPath, iconData);

      expect(props.id).to.equal(iconData.id);
      expect(props.src).to.equal(iconData.path);
      expect(props.width).to.equal(iconData.size.toString());
      expect(props.height).to.equal(iconData.size.toString());
    });
  });

  context('when platform is Android', () => {
    it('returns an object with id, path, and density', () => {
      const platform = 'android';
      const projectPath = '';
      const iconData = { path: 'foo', id: 'xxxhdpi' };

      const props = SerializeIcon(platform, projectPath, iconData);

      expect(props.id).to.equal(iconData.id);
      expect(props.src).to.equal(iconData.path);
      expect(props.density).to.equal(iconData.id);
    });
  });

  context('when platform is Windows', () => {
    const platform = 'windows';
    const projectPath = '';

    context('when icon data includes id and target', () => {
      it('returns an object with id, path, and target as target', () => {
        const iconData = {
          path: 'foo',
          id: 'smalllogo',
          attrs: {
            target: 'Square30x30Logo'
          }
        };

        const props = SerializeIcon(platform, projectPath, iconData);

        expect(props.id).to.equal(iconData.id);
        expect(props.src).to.equal(iconData.path);
        expect(props.target).to.equal(iconData.attrs.target);
      });
    })

    context('when icon data includes id and not target', () => {
      it('returns an object with id, path, and id as target', () => {
        const iconData = { path: 'foo', id: 'smalllogo' };

        const props = SerializeIcon(platform, projectPath, iconData);

        expect(props.id).to.equal(iconData.id);
        expect(props.src).to.equal(iconData.path);
        expect(props.target).to.equal(iconData.id);
      });
    })
  });
});
