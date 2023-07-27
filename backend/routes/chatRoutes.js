const express = require('express');
const router = express.Router();
const p = require('../middleware/authMiddleware');
const chatCtrl = require('../controllers/chatControllers');

router.use(p.protect);
router.route('/').post(chatCtrl.accessChat).get(chatCtrl.fetchChats);
router.route('/group').post(chatCtrl.createGroupChat);
router.route('/group/rename').put(chatCtrl.renameGroupChat);
router.route('/removefromgroup').post(chatCtrl.removeFromGroup);
router.route('/groupadd').post(chatCtrl.addToGroup);

module.exports = router;