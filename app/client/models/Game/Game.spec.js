'use strict';
const path = require('path');

const expect = require('chai').expect;
const fs = require('fs-readfile-promise');
const jsdom = require('mocha-jsdom');
const rerequire = jsdom.rerequire;
const sinon = require('sinon');

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
          expect($('#game #countbackCnt').length).eql(1);
          expect($('#game #popupCnt').length).eql(1);
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
    it('should call the reset function', () => {
      const spy = sinon.spy(game, 'reset');
      game._startGame('CVC');
      sinon.assert.calledOnce(spy);
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
    it('should reset the variables', () => {
      game._startGame('UVC');
      game.p1.startGuess = game.p2.startGuess = () => {};
      const spy1 = sinon.spy(game.p1, 'startGuess');
      const spy2 = sinon.spy(game.p2, 'startGuess');
      game._startRound();
      sinon.assert.calledOnce(spy1);
      sinon.assert.calledOnce(spy2);
    });
    it('should increase the number of rounds', () => {
      game._startGame('UVC');
      game.p1.startGuess = game.p2.startGuess = () => {};
      const prevRoundNumber = game.rounds;
      game._startRound();
      expect(game.rounds)
        .to.be.eql(prevRoundNumber + 1);
    });
  });

  describe('#_endRound', () => {
    it('should disable the choice for the players', () => {
      game._startGame('UVC');
      game.p1.endGuess = game.p2.endGuess = () => {};
      const spy1 = sinon.spy(game.p1, 'endGuess');
      const spy2 = sinon.spy(game.p2, 'endGuess');
      const spy3 = sinon.spy(game, 'whoWon');
      game._endRound();
      sinon.assert.calledOnce(spy1);
      sinon.assert.calledOnce(spy2);
      sinon.assert.calledOnce(spy3);
    });
    it('should handle right p1 won the round', () => {
      game._startGame('UVC');
      game.p1.endGuess = game.p2.endGuess = () => {};
      game.p1.choice = 0;
      game.p2.choice = 2;
      game.reset();
      game.p1.name = 'p1';
      game.p2.name = 'p2';
      game._endRound(game);
      expect(game.winnerText).to.be.eql(`${game.p1.name} WON`);
    });
    it('should handle right p2 won the round', () => {
      game._startGame('UVC');
      game.p1.endGuess = game.p2.endGuess = () => {};
      game.p1.choice = 1;
      game.p2.choice = 2;
      game.reset();
      game.p1.name = 'p1';
      game.p2.name = 'p2';
      game._endRound();
      expect(game.winnerText).to.be.eql(`${game.p2.name} WON`);
    });
    it('should handle right egal', () => {
      game._startGame('UVC');
      game.p1.endGuess = game.p2.endGuess = () => {};
      game.p1.choice = 1;
      game.p2.choice = 1;
      game.reset();
      game.p1.name = 'p1';
      game.p2.name = 'p2';
      game._endRound();
      expect(game.winnerText).to.be.eql('I\'s a draw');
    });
  });
  describe('#whoWon', () => {
    it('should reset the game parameters', () => {
      for (let i = 0; i < 10; i++) {
        const rand1 = Math.round(Math.random() * 2);
        const rand2 = Math.round(Math.random() * 2);
        expect(game.whoWon(rand1, rand2)).to.be.within(0, 2);
      }
    });
  });
  describe('#reset', () => {
    it('should reset the game parameters', () => {
      game.points = [2, 9];
      game.components = [User];
      game.rounds = 9;
      game.reset();
      expect(game.points).to.be.eql([0, 0]);
      expect(game.components).to.be.eql([]);
      expect(game.rounds).to.be.eql(1);
    });
  });
  describe('#onKeyEvent', () => {
    it('should call the components onKeyEvent method', () => {
      const MockedComponent = {
        onKeyEvent: () => {}
      };
      const spy = sinon.spy(MockedComponent, 'onKeyEvent');
      const rand = Math.round(Math.random() * 10 + 1);
      for (let i = 0; i < rand; i++) {
        game.components.push(MockedComponent);
      }
      game.onKeyEvent('1');
      sinon.assert.callCount(spy, rand);
    });
  });
});
