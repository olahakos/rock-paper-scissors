'use strict';

const expect = require('chai').expect;

const ComponentClass = require('./Component');

describe('Component', () => {
  let Component;
  before(function *() {
    Component = new ComponentClass();
  });

  it('should load the given template file');
  it('should _relpaceParams works with normal parameters');
  it('should _relpaceParams return null with empty parameters');
  it('should _relpaceParams throws error with wrong parameters');
});
