'use strict';
const path = require('path');

const expect = require('chai').expect;
const fs = require('fs-readfile-promise');
const jsdom = require('mocha-jsdom');
const rerequire = jsdom.rerequire;

const Component = require('../Component/Component');
const Countback = require('./Countback');

describe('Countback', () => {
  let countback;
  const validTemplatePath = path.resolve(__dirname, '../../views/Countback.html');
  const getData = (d) => (d.toString());
  const initH1 = 'Round 1';
  const changedText = '3';

  // setup jsdom
  jsdom();
  let $;
  before(function () {
    $ = rerequire('jquery');
  });

  beforeEach(function() {
    countback = new Countback(
      validTemplatePath,
      {counter: initH1}
    );
  });

  describe('#constructor', () => {
    it('should create a new game object.', () => {
      expect(new Countback())
        .to.be.ok;
    });
    it('should build the layout based on the template and the params', () => {
      return countback.getHtml(fs, getData)
        .then(html => {
          document.body.innerHTML = html;
          expect($('#countback').length).eql(1);
          expect($('#countback h1').length).eql(1);
          expect($('#countback h1').html()).eql(initH1);
        });
    });
  });

  describe('#changeText', () => {
    it('should change the text of the counter', () => {
      return countback.getHtml(fs, getData)
        .then(html => {
          document.body.innerHTML = html;
          countback.changeText(changedText);
          expect($('#countback h1').html()).eql(changedText);
        });
    });
  });

  describe('#counter', () => {
    it('should call the text changer time by time');
    it('should call the main callback function after the countdown');
  });
});
