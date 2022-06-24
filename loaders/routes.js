const apicache = require('apicache');
const cache = apicache.middleware;

const cacheQuery = cache('60 minutes', (req, res) => res.statusCode === 200, {
  appendKey: (req, res) => req.method + JSON.stringify(req.query)
});

module.exports = ({ app }) => {
  const modelRoutes = require(`${global.modules}/models/routes`);
  const drawingRoutes = require(`${global.modules}/drawings/routes`);
  const serviceRoutes = require(`${global.modules}/services/routes`);

  app.use('/models', cacheQuery, modelRoutes);
  app.use('/drawings', cacheQuery, drawingRoutes);
  app.use('/services', cacheQuery, serviceRoutes);
  app.get('/', (req, res) => res.sendFile(`${process.cwd()}/index.html`));
  return app;
};