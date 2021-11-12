const controller = require('./controllers');
const router = require('express').Router();

/* define API url to handler mappings here */

/* FOR BAREBONES TESTING ONLY */

/* GET REQUESTS */

router.get('/snome', controller.get.getAll);
/* FEEDBACK ON ROUTE BELOW: THOUGHTS ON THE ENDPOINT INCLUDING ID as a subdirectory
AND THEN PASSING THE ID NUMBER */
router.get('/snome/id/:id', controller.get.getOne);
router.get('/user/id/:id', controller.get.getUser);
router.get('/location', controller.get.getAll);
router.get('/location/:id', controller.get.getOne);
router.get('/match', controller.get.getAll);
/* for dev only */
router.get('/user', controller.get.getAllUsers);

/* PUT REQUESTS */

router.put('/snome/:id', controller.put.updateSnome);
router.put('/user/:id', controller.put.updateUser);

/* POST REQUESTS */
router.post('/snome', controller.post.createSnome);
router.post('/signup', controller.post.createUser);
// router.post('/snomes', controller.post.create);

/* DELETE REQUESTS */

router.delete('/snome/:id', controller.remove.deleteSnome);
router.delete('/user/:id', controller.remove.deleteUser)

module.exports = router;