const router = require("express").Router();
const { route } = require("express/lib/application");
const formData = require("../utils/formData");
const userController = require("../controllers/user.controller");
const { auth } = require("../utils/auth");

router.route("/").get(auth, userController.list);
router.route("/:role/:location").get(userController.listRole);
router.route("/register").post(userController.register);
router.route("/login").post(userController.login);
router.route("/myuser").get(auth, userController.show);
router.route("/:artistName").get(userController.showUser);
router.route("/myuser").put(auth, formData, userController.update);
router.route("/").put(userController.followUser);
router.route("/").delete(auth, userController.destroy);
module.exports = router;
