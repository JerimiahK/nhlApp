const router = require("express").Router();

const signIn = require("./signIn");

router.use("/users", signIn);

module.exports = router;
