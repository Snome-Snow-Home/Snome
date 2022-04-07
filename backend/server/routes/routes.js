const controller = require("../controllers");
const router = require("express").Router();
const { uploadSnomePhotos } = require("./middleware/multer.js");
const storage = require('@react-native-async-storage/async-storage');
const { Route53RecoveryCluster } = require("aws-sdk");
const jwt = require('express-jwt');
require('dotenv').config()

/* define API url to handler mappings here, organized by model and CRUD */
module.exports = router;

/* SNOME */
router.post(
  "/snome/:id/:location_id",
  // uploadSnomePhotos.any("snome_photos"),
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
router.get('/user_name/exists/:name', controller.user.userNameStatus);
router.get('/user', controller.user.getAllUsers); /* for dev only */
router.get('/user_email/exists/:email', controller.user.checkForEmail);
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

/* LIKES  */
router.get("/snome/like/exists/:snome_id/:snome_user_id", controller.get.checkLikes);
router.post("/snome/like/:snome_id/:snome_user_id", controller.post.createLike);
router.get("/like/navbar/:user_id", controller.get.getUnreadLikes);
router.get("/like/who_likes_me/:snome_id", controller.get.getWhoLikesMe);
router.delete("/unlike/:snome_id/:snome_user_id", controller.remove.deleteLike);

/* PUT REQUESTS */
router.put("/snome/:id", controller.put.updateSnome);
// router.put("/user/:id", controller.put.updateUser);
router.put("/review/:id", controller.put.updateReview);

/* MATCH */
router.get("/match/:id", controller.get.getMatches);

/* REVIEW */
router.post("/review", controller.post.createReview);
router.get("/snome/:id/review", controller.get.getSnomeReviews);
router.get("/review", controller.get.getAll);

/* SNOME PHOTO */
router.get("/snome/:id/photos", controller.get.getSnomePhotos);
router.post('/photos/:id', uploadSnomePhotos.any('snome_photos'), controller.post.createSnomePhotos);
// router.post("/photos/:id",
//   // (req, res) => { console.log("hello") });
//   controller.post.createSnomePhotos);  // for development only

/* Listing */
router.get("/listing/:id", controller.get.getListing);

/* Snome Desription */
router.get("/snome/description/:id", controller.get.getSnomeDescription);


router.get("/protected_has_token", jwt({ secret: process.env.TOKEN_SECRET, algorithms: ['HS256'] }), (req, res) => {
  // res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.send('protected: success')
});

/* MESSAGES to-and-from a given user*/
router.get("/messages/:user_id", controller.get.getMessages);
router.post("/messages/", controller.post.createMessage)
