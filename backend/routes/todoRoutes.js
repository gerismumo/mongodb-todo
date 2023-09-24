const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/', userController.createUser);
router.get('/', userController.selectUser);
router.put('/:id', userController.addUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;