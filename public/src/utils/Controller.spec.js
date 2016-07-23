'use strict';

const expect = require('chai-as-promised').expect;

const ControllerClass = require('./Controller');

describe('Controller', () => {
  let Controller;
  before(function *() {
    Controller = new ControllerClass();
  });

  it('should load the given template file');
  it('should _relpaceParams works with normal parameters');
  it('should _relpaceParams return null with empty parameters');
  it('should _relpaceParams throws error with wrong parameters');
});
