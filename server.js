const express = require("express");
const mongodb = require("mongodb").MongoClient;
const path = require("path");
const exphbs = require("express-handlebars");
const helpers = require("./utils/helpers");
const session = require("express-session");
var MongoDBStore = require("connect-mongodb-session")(session);

const app = express();
const PORT = process.env.PORT || 3001;

const connectionStringURI = `mongodb://127.0.0.1:27017/nhlProjectDB`;
const store = new MongoDBStore({
  uri: `mongodb://127.0.0.1:27017/nhlProjectDB`,
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
  () => {
    app.listen(PORT, () => {
      console.log(`Example app listening at http://localhost:${PORT}`);
    });
  }
);
