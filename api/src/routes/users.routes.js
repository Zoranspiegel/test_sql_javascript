const { Router } = require('express');
const mdw = require('../middlewares');
const ctr = require('../controllers');

const router = Router();

router.get('/profile', mdw.authentication, ctr.getProfile);

module.exports = router;
