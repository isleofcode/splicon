'use strict';

const expect        = require('../../helpers/expect');

const ValidatePlatforms = require('../../../src/utils/validate-platforms');

describe('ValidatePlatforms', () => {
  context('when platforms contain valid platforms', () => {
    const platforms = ['all', 'ios', 'android', 'blackberry', 'windows'];

    it('returns true', () => {
      expect(ValidatePlatforms(platforms)).to.equal(true);
    });
  });

  context('when platforms contain invalid platforms', () => {
    const platforms = ['symbian'];

    it('returns false', () => {
      expect(ValidatePlatforms(platforms)).to.equal(false);
    });
  });
});
