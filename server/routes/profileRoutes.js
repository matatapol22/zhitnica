const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

router.post('/edit-password', profileController.editPassword);

module.exports = router;