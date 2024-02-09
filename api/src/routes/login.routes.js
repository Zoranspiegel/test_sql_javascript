const { Router } = require('express');
const ctr = require('../controllers');

const router = Router();

router.post('/', ctr.loginUser);

module.exports = router;
