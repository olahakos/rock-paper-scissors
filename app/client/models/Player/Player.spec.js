'use strict';
const path = require('path');

const expect = require('chai').expect;
const fs = require('fs-readfile-promise');
const jsdom = require('mocha-jsdom');
const rerequire = jsdom.rerequire;

const Component = require('../Component/Component');
const Player = require('./Player');

describe('Player', () => {
  let player;
  const validTemplatePath = path.resolve(__dirname, '../../views/Player.html');
  const getData = (d) => (d.toString());

  // setup jsdom
  jsdom();
  let $;
  before(function () {
    $ = rerequire('jquery');
  });

  beforeEach(function() {
    player = new Player(validTemplatePath);
  });

  describe('#constructor', () => {
    it('should create a new game object.', () => {
      expect(new Player())
        .to.be.ok;
    });
    it('should build up the DOM based on the template', () => {
      return player.getHtml(fs, getData)
        .then(html => {
          document.body.innerHTML = html;
          expect($('.player').length).eql(1);
          expect($('.player h1').length).eql(1);
          expect($('.player ul').length).eql(1);
          expect($('.player li').length).eql(3);
        });
    });
  });
});
