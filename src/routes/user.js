const router = require("express").Router();
const { route } = require("express/lib/application");
const userController = require("../controllers/user.controller");
const { auth } = require("../utils/auth");

router.route("/").get(userController.list);
router.route("/register").post(userController.register);
router.route("/login").post(userController.login);
router.route("/myuser").get(auth, userController.show);
router.route("/myuser").put(auth, userController.update);
router.route("/").delete(auth, userController.destroy);
module.exports = router;
