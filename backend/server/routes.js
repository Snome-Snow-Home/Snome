const controller = require('./controllers');
const router = require('express').Router();

/* define API url to handler mappings here */

/* FOR BAREBONES TESTING ONLY */
router.get('/snome', controller.get.getAll);
router.get('/match', controller.get.getAll);

router.get('/snome/:id', controller.get.getOne);
// router.post('/snomes', controller.post.create);

module.exports = router;