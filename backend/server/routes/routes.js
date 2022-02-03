const controller = require("../controllers");
const router = require("express").Router();
const { uploadSnomePhotos } = require("./middleware/multer.js");
const storage = require('@react-native-async-storage/async-storage');
const { Route53RecoveryCluster } = require("aws-sdk");

/* define API url to handler mappings here, organized by model and CRUD */
module.exports = router;

/* SNOME */
router.post(
  "/snome",
  uploadSnomePhotos.any("snome_photos"),
  controller.post.createSnome
);
router.get("/snome", controller.get.getAll);
router.get("/snome/:id", controller.get.getOne);
router.put("/snome/:id", controller.put.updateSnome);
router.delete("/snome/:id", controller.remove.delete);

/* SNOME USER */
router.post('/signup', controller.user.createUser);
router.post('/login', controller.user.login);
router.get('/user/:id', controller.user.getUser);
router.get('/user_name/:name', controller.user.getUserByName);
router.get('/user', controller.user.getAllUsers); /* for dev only */
router.get('/user/exists/:email', controller.user.checkForEmail);
router.put('/user/:id', controller.user.updateUser);
router.delete('/user/:id', controller.user.deleteUser)
// router.post("/signup", controller.post.createUser);
// router.get("/user/id/:id", controller.get.getUser);
// router.get("/user", controller.get.getAllUsers); /* for dev only */
// router.put("/user/:id", controller.put.updateUser);
// router.delete("/user/:id", controller.remove.deleteUser);

/* ADDRESS */
router.get('/address/:id', controller.address.getAddress);

/* LOCATION */
// TODO create, update, delete location? (admin only)
router.get("/location", controller.get.getAll);
router.get("/location/:id", controller.get.getOne);
router.get("/snome/location/:id", controller.get.getSnomeByLocationId);
router.get("/featured_location", controller.get.getFeaturedLocation)

/* LIKES */
router.post("/like", controller.post.createLike);
router.get("/like/navbar/:user_id", controller.get.getUnreadLikes);

/* PUT REQUESTS */
router.put("/snome/:id", controller.put.updateSnome);
// router.put("/user/:id", controller.put.updateUser);
router.put("/review/:id", controller.put.updateReview);

/* MATCH */
router.get("/match", controller.get.getAll);

/* REVIEW */
router.post("/review", controller.post.createReview);
router.get("/snome/:id/review", controller.get.getSnomeReviews);
router.get("/review", controller.get.getAll);

/* SNOME PHOTO */
router.get("/snome/:id/photos", controller.get.getSnomePhotos);
router.post('/snome/:id/photos', uploadSnomePhotos.any('snome_photos'), controller.post.createSnomePhotos);  // for development only

/* Listing */
router.get("/listing/:id", controller.get.getListing);
