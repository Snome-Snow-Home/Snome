const controller = require('./controllers');
const router = require('express').Router();

/* define API url to handler mappings here */

/* FOR BAREBONES TESTING ONLY */

/* GET REQUESTS */
router.get('/snome', controller.get.getAll);
/* FEEDBACK ON ROUTE BELOW: THOUGHTS ON THE ENDPOINT INCLUDING ID as a subdirectory
AND THEN PASSING THE ID NUMBER */
router.get('/snome/id/:id', controller.get.getOne);
router.get('/snome_user/id/:id', controller.get.getOne);
router.get('/location', controller.get.getAll);
router.get('/location/:id', controller.get.getOne);
router.get('/like/navbar/:user_id', controller.get.getUnreadLikes);
router.get('/match', controller.get.getAll);
router.get('/snome/:id/review', controller.get.getSnomeReviews);
router.get('/review', controller.get.getAll);
/* for dev only */
router.get('/snome_user', controller.get.getAll);

/* PUT REQUESTS */
router.put('/snome/:id', controller.put.updateSnome);
router.put('/user/:id', controller.put.updateUser);

/* POST REQUESTS */

router.post('/like', controller.post.createLike);
router.post('/match', controller.post.createMatch);
router.post('/snome', controller.post.createSnome);
router.post('/signup', controller.post.createUser);


/* DELETE REQUESTS */

router.delete('/snome/:id', controller.remove.remove);
router.delete('/user/:id', controller.remove.remove);

module.exports = router;