const controller = require('../controllers');
const router = require('express').Router();
const { uploadSnomePhotos } = require('./middleware/multer.js');


/* define API url to handler mappings here */


/* GET REQUESTS */
router.get('/snome', controller.get.getAll);
/* FEEDBACK ON ROUTE BELOW: THOUGHTS ON THE ENDPOINT INCLUDING ID as a subdirectory
AND THEN PASSING THE ID NUMBER */
router.get('/snome/id/:id', controller.get.getOne);
router.get('/user/id/:id', controller.get.getUser);
router.get('/location', controller.get.getAll);
router.get('/location/:id', controller.get.getOne);
router.get('/like/navbar/:user_id', controller.get.getUnreadLikes);
router.get('/match', controller.get.getAll);
router.get('/snome/:id/review', controller.get.getSnomeReviews);
router.get('/review', controller.get.getAll);
/* for dev only */
router.get('/user', controller.get.getAllUsers);

/* PUT REQUESTS */
router.put('/snome/:id', controller.put.updateSnome);
router.put('/user/:id', controller.put.updateUser);

/* POST REQUESTS */
router.post('/snome', uploadSnomePhotos.array('snome_photos'), controller.post.createSnome);
router.post('/signup', controller.post.createUser);
router.post('/like', controller.post.createLike);
router.post('/review', controller.post.createReview);

// for development only
router.post('/snome/:id/photos', uploadSnomePhotos.array('snome_photos'), controller.post.createSnomePhotos);

/* DELETE REQUESTS */
router.delete('/snome/:id', controller.remove.deleteSnome);
router.delete('/user/:id', controller.remove.deleteUser);

module.exports = router;