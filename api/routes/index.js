const { Router } = require('express');
const { getUsers, createUser, getUserById, deleteUserById, updateUserById } = require('../controllers/index.controller.js');

const router = Router();
router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.delete('/users/:id', deleteUserById);
router.put('/users/:id', updateUserById);
router.post('/users', createUser);


module.exports = router;
