'use strict';
const path = require('path');

const expect = require('chai').expect;
const fs = require('fs-readfile-promise');
const jsdom = require('mocha-jsdom');
const rerequire = jsdom.rerequire;

const Component = require('../Component');
const Open = require('./Open');

describe('Open', () => {
  let open;
  const validTemplatePath = path.resolve(__dirname, '../../views/Open.html');
  const validParams = {
    headline: 'hi there',
    menu1: 'this is menu 1',
    menu2: 'this is menu 2'
  };
  const getData = (d) => (d.toString());

  // setup jsdom
  jsdom();
  let $;
  before(function () {
    $ = rerequire('jquery');
  });

  it('should have a <h1> header with the given headline text', function () {
    open = new Open(validTemplatePath, validParams);
    return open.getHtml(fs, getData)
      .then(html => {
        document.body.innerHTML = html;
        expect($('h1').length).eql(1);
        expect($('h1').html()).eql(validParams.headline);
      });
  });
  it('should have a <ul> the given menu items', function () {
    open = new Open(validTemplatePath, validParams);
    return open.getHtml(fs, getData)
      .then(html => {
        document.body.innerHTML = html;
        expect($('ul li').length).to.be.eql(2);
        expect($('ul li:nth-child(1) a').html()).eql(validParams.menu1);
        expect($('ul li:nth-child(2) a').html()).eql(validParams.menu2);
      });
  });
  it('should build the DOM without parameters', function () {
    open = new Open(validTemplatePath, {});
    return open.getHtml(fs, getData)
      .then(html => {
        document.body.innerHTML = html;
        expect($('h1').length).eql(1);
        expect($('ul li').length).to.be.eql(2);
      });
  });
});
