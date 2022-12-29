const router = require("express").Router();

const signIn = require("./signIn");

router.use("/sign-in", signIn);

module.exports = router;
