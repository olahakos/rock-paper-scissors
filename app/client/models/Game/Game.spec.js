'use strict';
const path = require('path');

const expect = require('chai').expect;
const fs = require('fs-readfile-promise');
const jsdom = require('mocha-jsdom');
const rerequire = jsdom.rerequire;

const Component = require('../Component/Component');
const Game = require('./Game');
const User = require('../../../../mock/MockedUser');
const Computer = require('../../../../mock/MockedComputer');

describe('Game', () => {
  let game;
  const validTemplatePath = path.resolve(__dirname, '../../views/Game.html');
  const getData = (d) => (d.toString());

  // setup jsdom
  jsdom();
  let $;
  before(function () {
    $ = rerequire('jquery');
  });

  beforeEach(function() {
    game = new Game(User, Computer, validTemplatePath);
  });

  describe('#constructor', () => {
    it('should create a new game object.', () => {
      expect(new Game())
        .to.be.ok;
      expect(new Game(User, Computer))
        .to.be.ok;
    });
    it('should build up the DOM based on the template', () => {
      return game.getHtml(fs, getData)
        .then(html => {
          document.body.innerHTML = html;
          expect($('#game').length).eql(1);
          expect($('#game #p1').length).eql(1);
          expect($('#game #p2').length).eql(1);
          expect($('#game #countback').length).eql(1);
        });
    });
  });

  describe('#_startGame', () => {
    it('should start the game with the given gameType. U Vs C', () => {
      game._startGame('UVC');
      expect(game.p1).to.be.an.instanceof(User);
      expect(game.p2).to.be.an.instanceof(Computer);
    });
    it('should start the game with the given gameType. C Vs C', () => {
      game._startGame('CVC');
      expect(game.p1).to.be.an.instanceof(Computer);
      expect(game.p2).to.be.an.instanceof(Computer);
    });
    it('should throw error if there is wrong gameType added', () => {
      try {
        game._startGame();
      } catch (e) {
        expect(e.name)
          .to.be.eql('ParamException');
      }
    });
    it('should throw error if we didn\'t add gameType', () => {
      try {
        game._startGame();
      } catch (e) {
        expect(e.name)
          .to.be.eql('ParamException');
      }
    });
  });

  describe('#_startRound', () => {
    it('should reset the variables');
    it('should start the countback');
  });

  describe('#_countback', () => {
    it('should handle the countback');
    it('should enable the choice for the players');
  });
  describe('#_endRound', () => {
    it('should disable the choice for the players');
    it('should handle right p1 won the round');
    it('should handle right p2 won the round');
    it('should handle right p1 won the round, and won the game');
    it('should handle right p2 won the round, and won the game');
    it('should handle right egal');
  });
  describe('#_endGame', () => {
    it('should end the game');
  });
});
