const app = module.exports = require('express')();
const fileHandler = require('../services/fileService');
const utils = require('../services/utils');

app.post('/', (req, res) => {
	var data = req.body.data;
	data = utils.process(data);
	fileHandler.writeResponse(data).then(response => {
		res.send(response);
	})
	.catch(err => {
		res.status('500').send(err);
	});
});

app.get('/file', (req, res) => {
  fileHandler.readResponse('response.json').then(response => {
    var parsedResponse = JSON.parse(response);
    fileHandler.writeResponse(parsedResponse).then(response => {
      res.send(parsedResponse);
    })
    .catch(err => {
      res.status('500').send(err);
    });
  })
  .catch(err => {
    res.status('500').send(err);
  });
});