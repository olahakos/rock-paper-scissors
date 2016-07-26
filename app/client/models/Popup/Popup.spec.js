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

  const initData = {
    headline: 'Round 1',
    points: '',
    result: '',
    details: 'You have <b>3 secounds</b> to choose.<br/>Push the <b>[1] [2] [3]</b> buttons to select you weapon.',
    startText: 'Start Game [ENTER]',
    startClick: 'app._startRound()',
    backText: 'Back [ESC]',
    backClick: 'app._landingPage()'
  };

  const updateData = {
    winnerText: 'Winner',
    points: [2, 3],
    result: 'Rock beats Scissors',
    startText: 'ng',
    backText: 'qg'
  };

  // setup jsdom
  jsdom();
  let $;
  before(function () {
    $ = rerequire('jquery');
  });
  beforeEach(function() {
    popup = new Popup(validTemplatePath, initData);
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
          expect($('#popup .details div').length).eql(3);
          expect($('#popup .buttonCnt').length).eql(1);
          expect($('#popup .buttonCnt button').length).eql(2);
        });
    });
  });
  describe('#onKeyEvent', () => {
    it('should Handle the "Escape" key propperly', () => {
      return popup.getHtml(fs, getData)
        .then(html => {
          document.body.innerHTML = html;
          const spy = sinon.spy(document.getElementById('popupBack'), 'click');
          popup.onKeyEvent('Escape');
          sinon.assert.calledOnce(spy);
        });
    });
    it('should Handle the "Enter" key propperly', () => {
      return popup.getHtml(fs, getData)
        .then(html => {
          document.body.innerHTML = html;
          const spy = sinon.spy(document.getElementById('popupStart'), 'click');
          popup.onKeyEvent('Enter');
          sinon.assert.calledOnce(spy);
        });
    });
    it('should not do anything if the popup element is not in the DOM', () => {
      document.body.innerHTML = '<div></div>';
      const spy = sinon.spy(document, 'getElementById');
      popup.onKeyEvent('Enter');
      sinon.assert.calledOnce(spy);
    });
  });
  describe('#updateTexts', () => {
    it('should update teh store datas', () => {
      popup.updateTexts(updateData);
      expect(popup.store.headline)
        .to.be.eql(updateData.winnerText);
      expect(popup.store.startText)
        .to.be.eql(updateData.startText);
      expect(popup.store.backText)
        .to.be.eql(updateData.backText);
    });
  });
  describe('#reset', () => {
    it('should reset the store to the original texts', () => {
      popup.updateTexts(updateData);
      popup.reset();
      expect(popup.store).to.be.eql(initData);
    });
  });
});
