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
    document.body.innerHTML = '<div id="p1"></div>';
  });

  beforeEach(function() {
    player = new Player(validTemplatePath, {}, 1);
  });

  describe('#constructor', () => {
    it('should create a new Player object.', () => {
      expect(new Player())
        .to.be.ok;
    });
    it('should build up the DOM based on the template', () => {
      return player.getHtml(fs, getData)
        .then(html => {
          $('#p1').html(html);
          expect($('.player').length).eql(1);
          expect($('.player h1').length).eql(1);
          expect($('.player ul').length).eql(1);
          expect($('.player li').length).eql(3);
        });
    });
  });
  describe('#addFocus', () => {
    it('should add an "active" class to the chosen element', () => {
      return player.getHtml(fs, getData)
        .then(html => {
          $('#p1').html(html);
          expect($('#p1 .active').length).eql(0);
          player.addFocus();
          expect($('#p1 .active').length).eql(1);
        });
    });
  });
  describe('#removeFocusAll', () => {
    it('should remove the "active" class from every element', () => {
      return player.getHtml(fs, getData)
        .then(html => {
          $('#p1').html(html);
          expect($('#p1 .active').length).eql(0);
          player.addFocus();
          expect($('#p1 .active').length).eql(1);
          const root = document.getElementById('p1');
          player.removeFocusAll(root);
          expect($('#p1 .active').length).eql(0);
        });
    });
  });
});
