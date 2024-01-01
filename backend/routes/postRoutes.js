const {Router} = require("express")
const postController = require("../controller/postController");

const router = Router();

router.post("/newPost",postController.createNewPost);
router.get("/getPosts",postController.getAllPost);
router.get("/getComments",postController.getComments);
router.post("/addComment",postController.addComment);

module.exports = router;