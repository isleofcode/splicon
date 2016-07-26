'use strict';

const expect        = require('../../helpers/expect');

const ValidatePlatforms = require('../../../src/utils/validate-platforms');

describe('ValidatePlatforms', () => {
  context('when platforms contain valid platforms', () => {
    it('returns true', () => {
      const platforms = ['all', 'ios', 'android', 'blackberry', 'windows'];

      expect(ValidatePlatforms(platforms)).to.equal(true);
    });
  });

  context('when platforms contain invalid platforms', () => {
    it('returns false', () => {
      const platforms = ['symbian'];

      expect(ValidatePlatforms(platforms)).to.equal(false);
    });
  });
});
