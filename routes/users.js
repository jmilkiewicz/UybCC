var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:userId([0-9]+)', function(req, res, next) {
  setTimeout(function(){
    var userStatus = getUserStatus(parseInt(req.params.userId));
    res.json(userStatus);
  },200)

});

router.post('/', function(req, res, next) {
  res.status(204).end();
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
