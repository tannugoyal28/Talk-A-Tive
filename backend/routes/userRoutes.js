const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userControllers');
const p = require('../middleware/authMiddleware')

router.post('/',userCtrl.registerUser); //route.post accepts only callback function
router.post('/login',userCtrl.authUser)
router.use(p.protect);
router.get('/',userCtrl.allUsers);

module.exports=router;