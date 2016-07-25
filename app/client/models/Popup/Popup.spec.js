'use strict';
const path = require('path');

const expect = require('chai').expect;
const fs = require('fs-readfile-promise');
const jsdom = require('mocha-jsdom');
const rerequire = jsdom.rerequire;
const sinon = require('sinon');

const Component = require('../Component/Component');
const Popup = require('./Popup');

describe('Popup', () => {
  let popup;

  const validTemplatePath = path.resolve(__dirname, '../../views/Popup.html');
  const getData = (d) => (d.toString());

  // setup jsdom
  jsdom();
  let $;
  before(function () {
    $ = rerequire('jquery');
  });
  beforeEach(function() {
    popup = new Popup(validTemplatePath);
  });

  describe('#constructor', () => {
    it('should create a new popup object.', () => {
      expect(new Popup())
        .to.be.ok;
    });

    it('should build up the DOM based on the template', function () {
      return popup.getHtml(fs, getData)
        .then(html => {
          document.body.innerHTML = html;
          expect($('#popup').length).eql(1);
          expect($('#popup h1').length).eql(1);
          expect($('#popup .details').length).eql(1);
          expect($('#popup .details div').length).eql(2);
          expect($('#popup .buttonCnt').length).eql(1);
          expect($('#popup .buttonCnt button').length).eql(2);
        });
    });
  });
});
