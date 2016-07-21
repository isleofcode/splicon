'use strict';

const expect        = require('../../helpers/expect');

const SerializeIcon = require('../../../src/utils/serialize-icon');

describe('SerializeIcon', () => {
  context('when platform is iOS', () => {
    it('returns an object with src, width, and height', () => {
      const platform = 'ios';
      const projectPath = '';
      const iconData = { src: 'foo', size: 180 };

      const props = SerializeIcon(platform, projectPath, iconData);

      expect(props.src).to.equal(iconData.src);
      expect(props.width).to.equal(iconData.size);
      expect(props.height).to.equal(iconData.size);
    });
  });

  context('when platform is Android', () => {
    it('returns an object with src and density', () => {
      const platform = 'android';
      const projectPath = '';
      const iconData = { src: 'foo', name: 'xxxhdpi' };

      const props = SerializeIcon(platform, projectPath, iconData);

      expect(props.src).to.equal(iconData.src);
      expect(props.density).to.equal(iconData.name);
    });
  });

  context('when platform is Windows', () => {
    const platform = 'windows';
    const projectPath = '';

    context('when icon data includes name and target', () => {
      it('returns an object with src and target as target', () => {
        const iconData = { src: 'foo', name: 'smalllogo', attrs: { target: 'Square30x30Logo' } };

        const props = SerializeIcon(platform, projectPath, iconData);

        expect(props.src).to.equal(iconData.src);
        expect(props.target).to.equal(iconData.attrs.target);
      });
    })

    context('when icon data includes name and not target', () => {
      it('returns an object with src and name as target', () => {
        const iconData = { src: 'foo', name: 'smalllogo' };

        const props = SerializeIcon(platform, projectPath, iconData);

        expect(props.src).to.equal(iconData.src);
        expect(props.target).to.equal(iconData.name);
      });
    })
  });
});
