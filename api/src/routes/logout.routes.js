const { Router } = require('express');
const ctr = require('../controllers');

const router = Router();

router.get('/', ctr.logoutUser);

module.exports = router;
