var urlParse = require('url');
var static = require('node-static');

function isOnlineOfflineQuery(request) {
	var queryParams = urlParse.parse(request.url, true).query;
	return request.method === 'GET' && queryParams && !isNaN(queryParams.user_id);
}

function responseBody(userId) {
	var serverResponse = {};
	if (userId % 2 === 0) {
		serverResponse.online = true;
	} else {
		serverResponse.online = false;
	}
	return serverResponse;
}

var fileServer = new static.Server("./www");

module.exports = function (request, response) {
	//TODO it is a hack how it works now, probably better to use express
	fileServer.serve(request, response, function (err, result) {
		console.log(err);
		console.log(result);
	});
	if(isOnlineOfflineQuery(request)) {
		setTimeout(function(){
			response.writeHead(200, {'Content-Type': 'application/json'});
			var userId = parseInt(urlParse.parse(request.url, true).query.user_id, 10);
			response.write(JSON.stringify(responseBody(userId)));
			response.end();
		}, 500);


	}

};
