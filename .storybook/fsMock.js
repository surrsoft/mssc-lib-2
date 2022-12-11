const fs = require('fs');
const path = require('path');

// noinspection JSUnusedGlobalSymbols
module.exports = {
	readFile: () => {
		const pathR = path.resolve(__dirname, 'main.js');
		return fs.readFile(pathR, 'utf8', (err, data) => {
			console.log('!!-!!-!! data {220508113203}\n', data); // del+
		})
	}
}
