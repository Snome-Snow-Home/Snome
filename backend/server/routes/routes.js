const controller = require("../controllers");
const router = require("express").Router();
const { uploadSnomePhotos } = require("./middleware/multer.js");

/* define API url to handler mappings here, organized by model and CRUD */
module.exports = router;

/* SNOME */
router.post(
  "/snome",
  uploadSnomePhotos.array("snome_photos"),
  controller.post.createSnome
);
router.get("/snome", controller.get.getAll);
router.get("/snome/:id", controller.get.getOne);
router.put("/snome/:id", controller.put.updateSnome);
router.delete("/snome/:id", controller.remove.delete);

/* SNOME USER */
router.post("/signup", controller.post.createUser);
router.get("/user/id/:id", controller.get.getUser);
router.get("/user", controller.get.getAllUsers); /* for dev only */
router.put("/user/:id", controller.put.updateUser);
router.delete("/user/:id", controller.remove.deleteUser);

/* LOCATION */
// TODO create, update, delete location? (admin only)
router.get("/location", controller.get.getAll);
router.get("/location/:id", controller.get.getOne);

/* LIKES */
router.post("/like", controller.post.createLike);
router.get("/like/navbar/:user_id", controller.get.getUnreadLikes);

/* PUT REQUESTS */
router.put("/snome/:id", controller.put.updateSnome);
router.put("/user/:id", controller.put.updateUser);
router.put("/review/:id", controller.put.updateReview);

/* MATCH */
router.get("/match", controller.get.getAll);

/* REVIEW */
router.post("/review", controller.post.createReview);
router.get("/snome/:id/review", controller.get.getSnomeReviews);
router.get("/review", controller.get.getAll);

/* SNOME PHOTO */

router.post('/snome/:id/photos', uploadSnomePhotos.any('snome_photos'), controller.post.createSnomePhotos);  // for development only

