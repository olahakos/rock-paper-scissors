'use strict';
const path = require('path');

const expect = require('chai').expect;
const fs = require('fs-readfile-promise');
const jsdom = require('mocha-jsdom');
const rerequire = jsdom.rerequire;
const sinon = require('sinon');

const Component = require('../Component/Component');
const Player = require('./Player');
const User = require('./User');

describe('User', () => {
  let user;
  let simulant;

  const validTemplatePath = path.resolve(__dirname, '../../views/Player.html');
  const getData = (d) => (d.toString());

  // setup jsdom
  jsdom();
  let $;
  before(function () {
    $ = rerequire('jquery');
    document.body.innerHTML = '<div id="p1"></div>';
    simulant = require('simulant');
  });

  beforeEach(function() {
    user = new Player(validTemplatePath, {}, 1);
  });

  describe('#constructor', () => {
    it('should create a new User object.', () => {
      expect(new User())
        .to.be.ok;
    });
  });
  describe('#startGuess', () => {
    it('should add an "active" class to the chosen element', () => {
      // return user.getHtml(fs, getData)
      //   .then(html => {
      //     $('#p1').html(html);
      //     user.removeFocusAll = () => {};
      //     const spy = sinon.spy(window, 'alert');
      //     user.startGuess(() => (console.log('callback')));
      //
      //     var e = $.Event('keydown');
      //     e.which = '2'.charCodeAt(0); // # Some key code value
      //     console.log(e.which);
      //     $(document).trigger(e);
      //   });
      // TODO: FIX IT
    });
    it('should choce the symbole based on witch key has been pressed');
  });
  describe('#endGuess', () => {
    it('should ignore to the keypress events from now');
  });
});
