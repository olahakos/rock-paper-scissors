'use strict';

const expect = require('chai').expect;

const Component = require('../Component/Component');
const Player = require('./Player');
const Computer = require('./Computer');

describe('Computer', () => {
  let computer;

  beforeEach(function() {
    computer = new Computer();
  });

  describe('#constructor', () => {
    it('should create a new game object.', () => {
      expect(new Computer())
        .to.be.ok;
    });
  });
  describe('#startGuess', () => {
    it('should generate the choice between 0-2', () => {
      computer.startGuess();
      expect(computer.choice).to.be.within(0, 2);
    });
  });
});
