const router = require("express").Router();

router.get("/sign-in", async (req, res) => {
    try {
      res.render("login");
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
