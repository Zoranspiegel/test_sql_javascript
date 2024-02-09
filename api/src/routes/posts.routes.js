const { Router } = require('express');
const mdw = require('../middlewares');
const ctr = require('../controllers');

const router = Router();

router.get('/feed', mdw.authentication, ctr.getFeedPosts);

router.get('/:id', mdw.authentication, ctr.getPostById);

router.patch('/:id', mdw.authentication, ctr.patchPost);

router.delete('/:id', mdw.authentication, ctr.deletePost);

router.post('/', mdw.authentication, ctr.createPost);

router.get('/', mdw.authentication, ctr.getUserPosts);

module.exports = router;
