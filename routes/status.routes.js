const express = require('express');
const router = express.Router();
const { updateStatusByPetId } = require('../controllers/status.controller');

router.put('/adoption/status/:petId', updateStatusByPetId);

module.exports = router;
