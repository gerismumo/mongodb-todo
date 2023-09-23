const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/addUser', userController.createUser);
router.get('/selectUsers', userController.selectUser);
router.put('/deleteUser/:id', userController.addUser);
router.delete('/editUser/:id', userController.deleteUser);

module.exports = router;