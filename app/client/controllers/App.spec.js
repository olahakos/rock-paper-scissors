'use strict';

const expect = require('chai').expect;
const jsdom = require('mocha-jsdom');
const rerequire = jsdom.rerequire;
const sinon = require('sinon');

const App = require('./App');
const MockedComponent = require('../../../mock/MockedComponent');
const MockedGame = require('../../../mock/MockedGame');

describe('App', () => {
  const mockText = 'Lorem ipsum';
  const mockHtml = `<div>${mockText}</div>`;
  const mockGameHtml = '<div><div id="p1">p1</div><div id="p2">p2</div><div id="popupCnt">asdf</div></div>';
  let mockedKeyboard = new MockedComponent();
  mockedKeyboard.subscribers = () => {};

  const validComponentParams = {
    OpenComponent: new MockedComponent(mockHtml),
    TutorialComponent: new MockedComponent(mockHtml),
    GameComponent: new MockedGame(MockedComponent, MockedComponent, mockGameHtml),
    CountbackComponent: new MockedComponent(),
    PopupComponent: new MockedComponent(),
    KeyboardHelper: mockedKeyboard
  };
  const invalidComponentParams = {};

  // setup jsdom
  jsdom();
  let $;
  before(function () {
    $ = rerequire('jquery');
  });

  describe('#constructor', () => {
    it('should works fine witch valid parameters', () => {
      expect(new App(document.body, validComponentParams))
        .to.be.done;
    });
    it('should throws error with invalid parameters', () => {
      try {
        return new App(document.body, invalidComponentParams);
      } catch (err) {
        expect(err.message)
          .to.be.eql('OpenComponent not found');
      }
    });
  });
  describe('#_landingPage', () => {
    it('should load the content of the OpenComponent', () => {
      const app = new App(document.body, validComponentParams);
      app.popup.reset = () => {};
      return app._landingPage()
        .then(() => {
          expect(document.body.innerHTML).to.be.eql(mockHtml);
          expect($('div').html()).eql(mockText);
        });
    });
  });
  describe('#_tutorialPage', () => {
    it('should load the content of the TutorialComponent', () => {
      const app = new App(document.body, validComponentParams);
      return app._tutorialPage()
        .then(() => {
          expect(document.body.innerHTML).to.be.eql(mockHtml);
          expect($('div').html()).eql(mockText);
        });
    });
  });
  describe('#_startGame', () => {
    it('should load the content of the GameComponent', () => {
      const app = new App(document.body, validComponentParams);
      app.game._startGame = () => {};
      app._openPopup = () => {};
      app.popup.reset = () => {};
      const spy1 = sinon.spy(app, '_openPopup');
      const spy2 = sinon.spy(app, 'mountComponent');
      return app._startGame()
        .then(() => {
          sinon.assert.callCount(spy2, 3);
          sinon.assert.calledOnce(spy1);
        });
    });
  });
  describe('#_openPopup', () => {
    it('should load popup', () => {
      const app = new App(document.body, validComponentParams);
      app.mountComponent(app.game, app.root);
      const spy = sinon.spy(app, 'mountComponent');
      return app._openPopup()
        .then(() => {
          sinon.assert.calledOnce(spy);
        });
    });
  });
  describe('#_closePopup', () => {
    it('should load popup', () => {
      const app = new App(document.body, validComponentParams);
      app.mountComponent(app.game, app.root);
      expect($('#popupCnt').html())
        .to.be.notempty;
      app._closePopup();
      expect($('#popupCnt').html())
        .to.be.empty;
    });
  });
  describe('#_startRound', () => {
    it('should start the next round', () => {
      const app = new App(document.body, validComponentParams);
      app.mountComponent(app.game, app.root);
      app.countback.startCounter = () => (Promise.resolve());
      app.game._startRound = () => {};
      const spy1 = sinon.spy(app, 'mountComponent');
      const spy2 = sinon.spy(app, '_closePopup');
      const spy3 = sinon.spy(app.countback, 'startCounter');
      const spy4 = sinon.spy(app.game, '_startRound');
      return app._startRound()
        .then(() => {
          sinon.assert.calledOnce(spy1);
          sinon.assert.calledOnce(spy2);
          sinon.assert.calledOnce(spy3);
          sinon.assert.calledOnce(spy4);
        });
    });
  });
  describe('#_endRound', () => {
    it('should end the current round', () => {
      const app = new App(document.body, validComponentParams);
      app.mountComponent(app.game, app.root);
      app._openPopup = () => {};
      app.game._endRound = () => {};
      app.popup.updateTexts = () => {};
      const spy1 = sinon.spy(app, '_openPopup');
      const spy2 = sinon.spy(app.game, '_endRound');
      const spy3 = sinon.spy(app.popup, 'updateTexts');
      app._endRound(app);
      sinon.assert.calledOnce(spy1);
      sinon.assert.calledOnce(spy2);
      sinon.assert.calledOnce(spy3);
    });
  });
});
