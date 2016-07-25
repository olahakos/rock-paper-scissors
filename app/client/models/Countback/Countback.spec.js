'use strict';
const path = require('path');

const assert = require('sinon').assert;
const expect = require('chai').expect;
const fs = require('fs-readfile-promise');
const jsdom = require('mocha-jsdom');
const rerequire = jsdom.rerequire;
const sinon = require('sinon');

const Component = require('../Component/Component');
const Countback = require('./Countback');

describe('Countback', () => {
  let countback;
  const validTemplatePath = path.resolve(__dirname, '../../views/Countback.html');
  const getData = (d) => (d.toString());
  const initH1 = 'Round 1';
  const changedText = '3';
  const callbackMessage = 'callback';
  this.clock = sinon.useFakeTimers();

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

  describe('#startCounter', () => {
    it('should call the text changer time by time', () => {
      return countback.getHtml(fs, getData)
        .then(html => {
          const spy = sinon.spy(countback, 'changeText');
          document.body.innerHTML = html;
          countback.startCounter(countback, () => {
            return true;
          });
          this.clock.tick((countback.texts.length) * countback.delayTime + 10);
          sinon.assert.callCount(spy, countback.texts.length);
        });
    });
    it('should call the main callback function after the countdown', () => {
      return countback.getHtml(fs, getData)
        .then(html => {
          const spy = sinon.spy(window, 'alert');
          document.body.innerHTML = html;
          countback.startCounter(
            countback,
            () => { window.alert(callbackMessage); },
            this
          );
          this.clock.tick((countback.texts.length) * countback.delayTime + 10);
          sinon.assert.calledOnce(spy);
        });
    });
  });
});
