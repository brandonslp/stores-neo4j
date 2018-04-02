const dotenv = require('dotenv');
const path = require('path');
const env = process.env.NODE_ENV || 'development';

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 * change .env.example from .env local
 */
dotenv.load({ path: __dirname+'/../.env' });

const config = {
	development:{
		app: {
			name: 'neo4j_development'
		},
		neo4j_user: 'neo4j',
		neo4j_pass: 'qpalwosk10',
		port: process.env.PORT || 3000,
	},
	test:{
		app: {
			name: 'neo4j_test'
		},
		port: 5000,
	},
	production:{
		app: {
			name: 'neo4j_production'
		},
		port: process.env.PORT || 8080,
	}

}

module.exports = config[env];