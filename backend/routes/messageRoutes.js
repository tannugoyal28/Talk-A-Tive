const express = require('express');
const router = express.Router();
const msgCtrl = require('../controllers/messageControllers')
const p = require('../middleware/authMiddleware')
router.use(p.protect);
router.post('/',msgCtrl.sendMessage);
// router.get('/hi',msgCtrl.Yes)
router.route('/:chatId').get(msgCtrl.allMessage);

module.exports = router;