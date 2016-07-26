'use strict';
const path = require('path');

const expect = require('chai').expect;
const fs = require('fs-readfile-promise');
const jsdom = require('mocha-jsdom');
const rerequire = jsdom.rerequire;
const sinon = require('sinon');

const Component = require('../Component/Component');
const Tutorial = require('./Tutorial');

describe('Tutorial', () => {
  let tutorial;
  let simulant;

  const validTemplatePath = path.resolve(__dirname, '../../views/Tutorial.html');
  const getData = (d) => (d.toString());
  const clickText = 'clicked';
  const onClick = 'console.log(app)';

  // setup jsdom
  jsdom();
  let $;
  before(function () {
    $ = rerequire('jquery');
  });
  beforeEach(function() {
    tutorial = new Tutorial(validTemplatePath, {onClick: onClick});
    simulant = require('simulant');
  });

  it('should have a <div> with #tutorial id', function () {
    return tutorial.getHtml(fs, getData)
      .then(html => {
        document.body.innerHTML = html;
        expect($('div#tutorial').length).eql(1);
      });
  });
  it('should have a <div> with .details class', function () {
    return tutorial.getHtml(fs, getData)
      .then(html => {
        document.body.innerHTML = html;
        expect($('div.details').length).eql(1);
      });
  });
  it('should have a <div> with .rules class, with an <ul> and 3 <li> rows', function () {
    return tutorial.getHtml(fs, getData)
      .then(html => {
        document.body.innerHTML = html;
        expect($('div.rules').length).eql(1);
        expect($('div.rules ul').length).eql(1);
        expect($('div.rules ul li').length).eql(3);
      });
  });
  it('should have a <button> element', function () {
    return tutorial.getHtml(fs, getData)
      .then(html => {
        document.body.innerHTML = html;
        expect($('button').length).eql(1);
      });
  });
});
