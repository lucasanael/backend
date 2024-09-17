const express = require('express');
const router = express.Router();
const userController = require('../controller/userController')

router.get('/' , userController.getUserPage);
router.get('/users' , userController.getUserData);


module.exports = router;