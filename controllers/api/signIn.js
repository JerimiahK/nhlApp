const router = require("express").Router();
const mongodb = require("mongodb").MongoClient

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

//gets sign up page
router.get("/sign-up", async (req, res) => {
  try {
    if (req.session.loggedIn) {
      res.redirect("/home");
      return;
    }
    res.render("signup");
  } catch (err) {
    res.status(500).json(err);
  }
});

//new user
router.post("/", async (req, res) => {
  const newUser = db.collection("userCollection").insertOne({
    email: req.body.email,
    password: req.body.password,
  });
  req.session.save(() => {
    req.session.loggedIn = true;

    res.status(200).json(newUser);
  });
});

//login route
router.post("/login", async (req, res) => {
  const userData = await db.collection("userCollection").findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (!userData) {
    res
      .status(400)
      .json({ message: "Incorrect email or password. Please try again!" });

    return;
  }
  const validPassword = req.body.password;
  if (!validPassword) {
    res
      .status(400)
      .json({ message: "Incorrect email or password, please try again!" });
    return;
  }

  req.session.save(() => {
    req.session.loggedIn = true;

    res.status(200).json({ user: userData });
  });
  console.log(req.session.loggedIn);
});

router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
