const mongodb = require("mongodb").MongoClient;
const router = require("express").Router();

router.get("/", async (req, res) => {
  db.collection("userCollection")
    .find()
    .toArray((err, results) => {
      if (err) throw err;
      res.send(results);
    });
});

router.get("/login", async (req, res) => {
  try {
    res.render("login");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/sign-up", async (req, res) => {
  try {
    res.render("signup");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  db.collection("userCollection").insertOne(
    {
      email: req.body.email,
      password: req.body.password,
    },
    (err, results) => {
      if (err) throw err;
      res.json(results);
    }
  );
});

router.post("/login", (req, res) => {
  const userData = db.collection("userCollection").find({
    email: req.body.email,
    password: req.body.password,
  });
  res.status(200).json({ user: userData });
});

module.exports = router;
