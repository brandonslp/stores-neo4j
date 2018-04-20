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
		let result = await(neo4j.find('Store',{name: req.params.name}));
		res.json(result);
	}catch(err){
		console.log(err);
		res.json({message:'error'});
	}
});

exports.insert = async (function(req, res) {
	try{
		//to do remove
		let nodes = [{name:'t1', route: [{store:'t2', time:10}]},{name:'t2', route: [{store:'t1', time:10}]}] ,
		cypherNodes = '',
		cypherRoutes = '',
		label = 'Store';
		nodes.forEach((item, index)=>{
			cypherNodes+=`(${item.name}:${label} {name:'${item.name}'})`;
			item.route.forEach((r, j)=>{
				cypherRoutes+=`(${item.name})-[:RELATED {time: ${r.time}}]->(${r.store})`;
				if(Object.keys(nodes)[index+1])
					cypherRoutes+=',';
			});
			if(Object.keys(nodes)[index+1])
				cypherNodes+=',';
		});
		let result = await(neo4j.insert('Store',cypherNodes, cypherRoutes));
		res.json('result');
	}catch(err){
		console.log(err);
		res.json({message:'error'});
	}
});

exports.update = async (function(req, res) {
	try{
		let query = {name:req.params.name};
		let result = await(neo4j.update('Store',query, req.body));
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