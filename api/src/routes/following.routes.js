const { Router } = require('express');
const mdw = require('../middlewares');
const ctr = require('../controllers');

const router = Router();

router.get('/', mdw.authentication, ctr.getFollowingUsers);

module.exports = router;
