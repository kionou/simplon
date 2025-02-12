var express = require('express');
const dataParticipant = require('../controllers/controPart');
const { ValiderRegistre } = require('../middleware/validator');
var router = express.Router();



/* GET home page. */
router.get('/',dataParticipant.getParticipant);
router.post('/',ValiderRegistre,dataParticipant.postParticipant);
router.get('/listes-participants',dataParticipant.AllParticipant);
router.get('/notifications',dataParticipant.getNotification);
router.post('/notifications',dataParticipant.postNotifications);



module.exports = router;
