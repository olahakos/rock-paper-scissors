'use strict';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const expect = require('chai').expect;

const Controller = require('./Controller');
const MockedComponent = require('../../../../mock/MockedComponent');

chai.use(chaiAsPromised);

describe('Controller', () => {
  let controller;
  let root;
  const initText = 'init value';
  const mockedTarget = { innerHTML: 'init text' };
  const mockHtml = '<div>Lorem ipsum</div>';
  const mockedComponent = new MockedComponent(mockHtml);

  beforeEach(function() {
    root = { innerHTML: initText };
  });

  describe('#constructor', () => {
    it('should store the root parameter', () => {
      controller = new Controller(root);
      return expect(controller.root)
        .to.be.eql(root);
    });
  });
  describe('#mountComponent', () => {
    it('should load the given component\'s html into the targeted element', () => {
      controller = new Controller(root);
      return controller.mountComponent(mockedComponent, mockedTarget)
        .then(() => {
          expect(mockedTarget.innerHTML).to.be.eql(mockHtml);
          expect(root.innerHTML).to.be.eql(initText);
        });
    });
    it('should load the given component\'s html into the root element if there is no target element in the parameters', () => {
      controller = new Controller(root);
      return controller.mountComponent(mockedComponent)
        .then(() => {
          expect(root.innerHTML).to.be.eql(mockHtml);
        });
    });

    it('should reject without target and root parameters', () => {
      controller = new Controller();
      try {
        controller.mountComponent(mockedComponent, {});
      } catch (err) {
        expect(err.message).to.be.eql('Parameter Error');
      }
    });
  });
});
