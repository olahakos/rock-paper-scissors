'use strict';

const expect = require('chai').expect;

const Component = require('../Component/Component');
const Player = require('./Player');
const User = require('./Computer');

describe('User', () => {
  let user;

  beforeEach(function() {
    user = new User();
  });

  describe('#constructor', () => {
    it('should create a new game object.', () => {
      expect(new User())
        .to.be.ok;
    });
  });
  describe('#startGuess', () => {
    it('should start to listen to the keypresses', () => {

    });
    it('should choce the symbole based on the witch key has been pressed');
  });
  describe('#endGuess', () => {
    it('should ignore to the keypress events from now');
  });
});
