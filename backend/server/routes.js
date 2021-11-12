const controller = require('./controllers');
const router = require('express').Router();

/* define API url to handler mappings here */

/* FOR BAREBONES TESTING ONLY */

/* GET REQUESTS */

router.get('/snome', controller.get.getAll);
router.get('/match', controller.get.getAll);
router.get('/snome/:id', controller.get.getOne);
<<<<<<< HEAD
router.get('/location', controller.get.getAll);
=======

/* PATCH REQUESTS */

router.patch('/snome/:id', controller.patch.updateSnome);

/* POST REQUESTS */

>>>>>>> 80ac58a93a1ca7f7de81116e3466d0074ed0293c
// router.post('/snomes', controller.post.create);

module.exports = router;