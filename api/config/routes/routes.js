const routes = require('express').Router();

const movies = require('../../app/controllers/movies');

routes.get('/',movies.getAll);

module.exports = routes;