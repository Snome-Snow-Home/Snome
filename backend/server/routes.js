const controller = require('./controllers');
const router = require('express').Router();

/* define API url to handler mappings here */

/* FOR BAREBONES TESTING ONLY */

/* GET REQUESTS */

router.get('/snome', controller.get.getAll);
router.get('/snome/:id', controller.get.getOne);
router.get('/location', controller.get.getAll);
router.get('/location/:id', controller.get.getOne);
router.get('/match', controller.get.getAll);

/* PATCH REQUESTS */

router.patch('/snome/:id', controller.patch.updateSnome);

/* POST REQUESTS */

// router.post('/snomes', controller.post.create);

module.exports = router;