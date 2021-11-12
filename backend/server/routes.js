const controller = require('./controllers');
const router = require('express').Router();

/* define API url to handler mappings here */

/* FOR BAREBONES TESTING ONLY */

/* GET REQUESTS */

router.get('/snome', controller.get.getAll);
router.get('/snome/id/:id', controller.get.getOne);
router.get('/user/id/:id', controller.get.getUser);
router.get('/location', controller.get.getAll);
router.get('/location/:id', controller.get.getOne);
router.get('/match', controller.get.getAll);

/* PUT REQUESTS */

router.put('/snome/:id', controller.put.updateSnome);

/* POST REQUESTS */
router.post('/snome', controller.post.createSnome);
router.post('/signup', controller.post.createUser);
// router.post('/snomes', controller.post.create);

/* DELETE REQUESTS */

router.delete('/snome/:id', controller.deletes.deleteSnome);

module.exports = router;