'use strict';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const expect = require('chai').expect;

const Controller = require('./Controller');

chai.use(chaiAsPromised);

describe('Controller', () => {
  let controller;
  let root;

  const mockHtml = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do';
  const initText = 'init value';
  const mockedComponent = {
    getHtml: (params) => (Promise.resolve(mockHtml))
  };
  const mockedTarget = { innerHTML: 'init text' };

  beforeEach(function() {
    root = { innerHTML: initText };
  });

  it('should store the root parameter', () => {
    controller = new Controller(root);
    return expect(controller.root)
      .to.be.eql(root);
  });
  it('should load the given component\'s html into the targeted element', () => {
    controller = new Controller(root);
    return controller.loadElement(mockedComponent, {}, mockedTarget)
      .then(() => {
        expect(mockedTarget.innerHTML).to.be.eql(mockHtml);
        expect(root.innerHTML).to.be.eql(initText);
      });
  });

  it('should load the given component\'s html into the root element if there is no target element in the parameters', () => {
    controller = new Controller(root);
    return controller.loadElement(mockedComponent, {})
      .then(() => {
        expect(root.innerHTML).to.be.eql(mockHtml);
      });
  });

  it('should reject without params', () => {
    controller = new Controller(root);
    try {
      controller.loadElement(mockedComponent);
    } catch (err) {
      expect(err.message).to.be.eql('Parameter Error');
    }
  });

  it('should reject without target and root parameters', () => {
    controller = new Controller();
    try {
      controller.loadElement(mockedComponent, {});
    } catch (err) {
      expect(err.message).to.be.eql('Parameter Error');
    }
  });
});
