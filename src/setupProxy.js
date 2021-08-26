const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  const setupProxy = (path, target) => {
    app.use(
      path,
      createProxyMiddleware({
        target,
        changeOrigin: true,
      })
    );
    console.log('*************************startert visning av path:', path);
    console.log('target', target);
  };

  setupProxy('/samtalestotte-podlet', 'http://localhost:3001');
};
