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
    user = new User(validTemplatePath, {}, 1);
  });

  describe('#constructor', () => {
    it('should create a new User object.', () => {
      expect(new User())
        .to.be.ok;
    });
  });
  describe('#startGuess', () => {
    it('should start to listen to the key events', () => {
      expect(user.listen).to.be.false;
      user.removeFocusAll = () => {};
      const spy = sinon.spy(user, 'removeFocusAll');
      user.startGuess();
      expect(user.listen).to.be.ok;
      sinon.assert.calledOnce(spy);
    });
  });
  describe('#endGuess', () => {
    it('should ignore to the keypress events from now', () => {
      expect(user.listen).to.be.false;
      user.removeFocusAll = () => {};
      user.startGuess();
      expect(user.listen).to.be.ok;
      user.endGuess();
      expect(user.listen).to.be.false;
    });
  });

  describe('#onKeyEvent', () => {
    it('should handle right if we add propper events', () => {
      user.addFocus = () => {};
      user.removeFocusAll = () => {};
      const spy = sinon.spy(user, 'addFocus');
      user.startGuess();
      const keyEvent = Math.round(Math.random() * 2) + 1;
      user.onKeyEvent(keyEvent.toString());
      sinon.assert.calledOnce(spy);
    });
    it('should not rerender, if the event is not valid', () => {
      user.addFocus = () => {};
      user.removeFocusAll = () => {};
      const spy = sinon.spy(user, 'addFocus');
      user.startGuess();
      user.onKeyEvent('Enter');
      sinon.assert.notCalled(spy);
    });
    it('should not rerender, if we are not listen', () => {
      user.addFocus = () => {};
      user.removeFocusAll = () => {};
      const spy = sinon.spy(user, 'addFocus');
      user.startGuess();
      user.endGuess();
      const keyEvent = Math.round(Math.random() * 2) + 1;
      user.onKeyEvent(keyEvent.toString());
      sinon.assert.notCalled(spy);
    });
  });
  describe('#onClickEvent', () => {
    it('should handle the click events if the object is listening', () => {
      return user.getHtml(fs, getData)
        .then(html => {
          $('#p1').html(html);
          user.onKeyEvent = () => {};
          user.addFocus = () => {};
          user.removeFocusAll = () => {};
          const spy = sinon.spy(user, 'onKeyEvent');
          user.startGuess();
          const keyEvent = Math.round(Math.random() * 2);
          const caller = document
            .getElementById('p1')
            .getElementsByClassName('buttonCnt')[0]
            .querySelector(`div:nth-child(${keyEvent + 1})`);
          user.onClickEvent(caller);
          sinon.assert.calledOnce(spy);
        });
    });
    it('should deny the click event if it\'s not listening', () => {
      return user.getHtml(fs, getData)
        .then(html => {
          $('#p1').html(html);
          user.onKeyEvent = () => {};
          user.addFocus = () => {};
          user.removeFocusAll = () => {};
          const spy = sinon.spy(user, 'onKeyEvent');
          user.startGuess();
          user.endGuess();
          const keyEvent = Math.round(Math.random() * 2);
          const caller = document
            .getElementById('p1')
            .getElementsByClassName('buttonCnt')[0]
            .querySelector(`div:nth-child(${keyEvent + 1})`);
          user.onClickEvent(caller);
          sinon.assert.notCalled(spy);
        });
    });
  });
});
