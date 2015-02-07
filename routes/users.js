var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:userId([0-9]+)', function(req, res, next) {
  var userStatus = getUserStatus(parseInt(req.params.userId));
  res.json(userStatus);
});

router.post('/', function(req, res, next) {
  res.status(201).end();
});

function getUserStatus(userId) {
  var serverResponse = {};
  if (userId % 2 === 0) {
    serverResponse.online = true;
  } else {
    serverResponse.online = false;
  }
  return serverResponse;
}

module.exports = router;
