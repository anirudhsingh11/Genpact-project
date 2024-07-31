const express = require("express");
const router = express.Router();

const { registerUser, getUserById, loginUser } = require("../controllers/user");

router.post("/register", registerUser);
router.get("/id/:user_id", getUserById);
router.post("/login", loginUser);

module.exports = router;
