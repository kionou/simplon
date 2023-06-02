var express = require('express');
const dataParticipant = require('../controllers/controPart');
var router = express.Router();


/* GET home page. */
router.get('/',dataParticipant.getParticipant);
router.post('/post',dataParticipant.postParticipant);
router.get('/listes-participants',dataParticipant.AllParticipant);



module.exports = router;
