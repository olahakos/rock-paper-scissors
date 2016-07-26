'use strict';
const path = require('path');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const expect = require('chai').expect;
const fs = require('fs-readfile-promise');

const Component = require('./Component');

chai.use(chaiAsPromised);

describe('Component', () => {
  let component;

  const validTemplatePath = path.resolve(__dirname, '../../../../mock/template.html');
  const invalidTemplatePath = path.resolve(__dirname, '../../../../mock/templateNOT.html');

  const testText = 'test message';
  const testText2 = 'new mock message';
  const testParams = {msg: testText};
  const wrongParams = {themsg: testText};
  const multiParams = {msg: testText, sec: testText2};
  const emptySlot = '{msg}';
  const getData = (d) => (d.toString());

  describe('#constructor', () => {
    it('should load the given template file', () => {
      component = new Component(validTemplatePath, testParams);
      return expect(component.getHtml(fs, getData))
        .to.be.a('promise')
        .to.eventually.have.string(testText);
    });
    it('should throw error ifthe given template file not exists', () => {
      component = new Component(invalidTemplatePath, testParams);
      return expect(component.getHtml(fs))
        .to.be.a('promise')
        .to.eventually.rejected.and.notify();
    });
  });

  describe('#_relpaceParams', () => {
    it('should _relpaceParams return null with empty parameters', () => {
      component = new Component(validTemplatePath, {});
      return expect(component.getHtml(fs, getData))
        .to.be.a('promise')
        .to.eventually.have.string(emptySlot);
    });
    it('should without any kind of default store parameter', () => {
      component = new Component(validTemplatePath);
      return expect(component.getHtml(fs, getData))
        .to.be.a('promise')
        .to.eventually.have.string(emptySlot);
    });
    it('should _relpaceParams skip if there is no peremeter witch would fit', () => {
      component = new Component(validTemplatePath, wrongParams);
      return expect(component.getHtml(fs, getData))
        .to.be.a('promise')
        .to.eventually.have.string(emptySlot);
    });
    it('should _relpaceParams work with multiple parameters', () => {
      component = new Component(validTemplatePath, multiParams);
      return expect(component.getHtml(fs, getData))
        .to.be.a('promise')
        .to.eventually.have.string(testText)
        .to.eventually.have.string(testText2);
    });
  });
});
