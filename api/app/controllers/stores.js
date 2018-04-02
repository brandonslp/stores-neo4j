let async = require('asyncawait/async');
let await = require('asyncawait/await');
let neo4j = require('../../config/neo4j/neo4j');

exports.getAll = async (function(req, res) {
	try{
		let result = await(neo4j.getAll('Store'))
		res.json(result);
	}catch(err){
		console.log(err);
		res.json({message:'error'});
	}
});

exports.getByName = async (function(req, res) {
	try{
		let result = await(neo4j.getByParam('Store',{name: req.params.name}));
		res.json(result);
	}catch(err){
		console.log(err);
		res.json({message:'error'});
	}
});

exports.getByJump = async (function(req, res) {
	try{
		let result = await(neo4j.getJumpRoutes('Store',{name: req.params.name}, req.params.jump));
		res.json(result);
	}catch(err){
		console.log(err);
		res.json({message:'error'});
	}
});

exports.getShortestRoute = async (function(req, res) {
	try{
		let result = await(neo4j.getByShortestRoute('Store',{start: req.params.start, end:req.params.end}));
		res.json(result);
	}catch(err){
		console.log(err);
		res.json({message:'error'});
	}
});

exports.getRoutes = async (function(req, res) {
	try{
		let result = await(neo4j.getRoutesRating('Store',{start: req.params.start, end:req.params.end},req.params.jumps));
		res.json(result);
	}catch(err){
		console.log(err);
		res.json({message:'error'});
	}
});