const routes = require('express').Router();

const stores = require('../../app/controllers/stores');

routes.get('/stores',stores.getAll);
routes.get('/stores/:name',stores.getByName);
routes.get('/stores/:name/jump/:jump',stores.getByJump);
routes.get('/stores/start/:start/end/:end',stores.getShortestRoute);
routes.get('/stores/start/:start/end/:end/jumps/:jumps',stores.getRoutes);

module.exports = routes;