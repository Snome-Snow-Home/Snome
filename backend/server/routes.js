const controller = require('./controllers');
const router = require('express').Router();

/* define API url to handler mappings here */

/* FOR BAREBONES TESTING ONLY */
router.get('/snomes', controller.get.snomes);
router.post('/snomes', controller.post.snomes);

module.exports = router;