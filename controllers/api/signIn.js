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

router.post("/login", async (req, res) => {
  const userData = await db.collection("userCollection").findOne({
    email: req.body.email,
    password: req.body.password,
  }
  );
  console.log(userData);
  if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });

      return;
    }
    const validPassword = req.body.password
    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again!" });
      return;
    }

  req.session.save(() => {
    req.session.loggedIn = true;
  });

  res.status(200).json({ user: userData });
});

module.exports = router;
