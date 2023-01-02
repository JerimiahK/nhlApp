const express = require("express");
const mongodb = require("mongodb").MongoClient;
const path = require("path");
const exphbs = require("express-handlebars");
const helpers = require("./utils/helpers");
const session = require("express-session");
var MongoDBStore = require("connect-mongodb-session")(session);
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

const store = new MongoDBStore({
  uri: process.env.MONGODB_URL,
  collection: "mySessions",
});

const hbs = exphbs.create({ helpers });

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  require("express-session")({
    secret: "12345",
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
    store: store,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(require("./controllers"));

mongodb.connect(
  process.env.MONGODB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    db = client.db();
    app.listen(PORT, () => {
      console.log(`Example app listening at http://localhost:${PORT}`);
    });
  }
);
