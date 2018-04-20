let async = require('asyncawait/async');
let await = require('asyncawait/await');
let config = require('../config');
let neo4j = require('neo4j-driver').v1;
let driver = neo4j.driver(process.env.NEO4J_URI, neo4j.auth.basic(config.neo4j_user,config.neo4j_pass));
let session = 0;


let getSession = async (function() {
									try{
										if(!session)
											session = driver.session();
										return session;
									}catch(err){
										throw err;
									}
								});

exports.insert = async (function(model, nodes, relations) {
	try{
		console.log(`CREATE ${nodes} CREATE ${relations}`);
		let result = await(await(getSession())
												.run(`CREATE ${nodes} CREATE ${relations}`));
		await(getSession()).close();
		return result;
	}catch(err){
		throw err;
	}
});

//key and primitive value
exports.update = async (function(model, query, set) {
	try{
		let result = await(await(getSession())
												.run(`MATCH(a:${model} ${jsonToRaw(query)}) set a+= ${jsonToRaw(set)} return a`));
		await(getSession()).close();
		return result;
	}catch(err){
		throw err;
	}
});

exports.getAll = async (function(model) {
	try{
		let result = await(await(getSession())
												.run(`MATCH(a:${model}) return a`))
		await(getSession()).close();
		return result;
	}catch(err){
		throw err;
	}
});

exports.find = async (function(model, query) {
	try{
		let result = await(await(getSession())
												.run(`MATCH(a:${model} ${jsonToRaw(query)}) return a`))
		await(getSession()).close();
		return result;
	}catch(err){
		throw err;
	}
});

exports.getJumpRoutes = async (function(model, query, jump) {
	try{
		let relations = ''
		for (var i = 0; i < jump; i++) {
			relations+=`-[r${i}]-(b${i})`;
		}
		let result = await(await(getSession())
												.run(`MATCH(a:${model} ${jsonToRaw(query)})${relations}  return *`))
		await(getSession()).close();
		return result;
	}catch(err){
		throw err;
	}
});

exports.getByShortestRoute = async (function(model, data) {
	try{
		let result = await(await(getSession())
												.run(`MATCH (a:${model} {name: '${data.start}'}),(b:${model} {name:'${data.end}'}), p=allShortestPaths((a)-[*]-(b)) return p`))
		await(getSession()).close();
		return result;
	}catch(err){
		throw err;
	}
});


exports.getRoutesRating = async (function(model, data, jumps) {
	try{
		let result = await(await(getSession())
												.run(`MATCH p= (a:${model} {name: '${data.start}'})-[*0..${jumps}]-(b:${model} {name: '${data.end}'}) RETURN EXTRACT (n IN nodes(p)|n.name) as store,(reduce(s=0, r in relationships(p) | s + r.rating)) as rating,length(p) as saltos ORDER BY rating`))
		await(getSession()).close();
		return result;
	}catch(err){
		throw err;
	}
});

function jsonToRaw(json) {
	let raw = '{';
	Object.keys(json).forEach((item, index)=>{
		raw += Object.keys(json)[index] + ':';
		let value = json[Object.keys(json)[index]];
		if(typeof value == 'string')
			raw += "'"+value+"'";
		else
			raw += value;
		if(Object.keys(json)[index+1])
			raw+=',';
	});
	raw += '}';
	return raw;
}