let async = require('asyncawait/async');
let await = require('asyncawait/await');
let config = require('../../config/config');
let neo4j = require('neo4j-driver').v1;

exports.getAll = async (function(req, res) {
	try{
		let driver = neo4j.driver(process.env.NEO4J_URI, neo4j.auth.basic(config.neo4j_user,config.neo4j_pass));
		let session = driver.session();
		let result = await(session.run('MATCH(a:Person)-[r]-(b) where a.name="Angela Scope" return a,r,b'));
		session.close();
		res.json(result);
	}catch(err){
		console.log(err);
		res.json({message:'error'});
	}
});