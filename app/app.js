'use strict';
const resolve = require('path').resolve;

const debug = require('debug')('app');
const koa = require('koa');
const serve = require('koa-static');

const config = require('./config');

const app = koa();

// TODO: change koa to self written service
app.use(serve(resolve(__dirname, 'client')));

app.listen(config.port, () => {
  debug('Server is listening on ' + config.port);
});

module.exports = app;
