const { Router } = require('express');
const ctr = require('../controllers');

const router = Router();

router.post('/', ctr.signupUser);

module.exports = router;
