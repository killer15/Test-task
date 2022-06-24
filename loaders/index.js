const expressLoader = require('./express');
const routeLoader = require('./routes');

module.exports = async ({ expressApp }) => {
  await expressLoader({ app: expressApp });
  console.log('Express Initialized');

  await routeLoader({ app: expressApp });
  console.log('Route Initialized');
  // ... more loaders can be here , exp : load db

};