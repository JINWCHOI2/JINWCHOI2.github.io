const express = require('express');
const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function(app) {
    // app.use(
    //   '/updateEmailServer',
    //   createProxyMiddleware({
    //     target: 'http://localhost:4000/',
    //     secure: false,
    //     changeOrigin: true,
    //   })
    // );
    app.use(
      '/email/*',
      createProxyMiddleware({
        target: 'http://localhost:4000/',
        secure: false,
        changeOrigin: true,
      })
    );
};