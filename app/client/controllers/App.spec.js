'use strict';

const expect = require('chai').expect;
const jsdom = require('mocha-jsdom');
const rerequire = jsdom.rerequire;

const App = require('./App');
const MockedComponent = require('../../../mock/MockedComponent');
const MockedKeyboard = require('../../../mock/MockedKeyboard');

describe('App', () => {
  const mockText = 'Lorem ipsum';
  const mockHtml = `<div>${mockText}</div>`;
  const validComponentParams = {
    OpenComponent: new MockedComponent(mockHtml),
    TutorialComponent: new MockedComponent(mockHtml),
    GameComponent: new MockedComponent(mockHtml),
    CountbackComponent: new MockedComponent(),
    PopupComponent: new MockedComponent(),
    KeyboardHelper: new MockedKeyboard()
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
      return app._landingPage()
        .then(() => {
          expect(document.body.innerHTML).to.be.eql(mockHtml);
          expect($('div').html()).eql(mockText);
        });
    });
  });
});
