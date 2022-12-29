const express = require("express");
const mongodb = require("mongodb").MongoClient;
const path = require("path");
const exphbs = require("express-handlebars");
const helpers = require("./utils/helpers");

const app = express();
const PORT = process.env.PORT || 3001;

const connectionStringURI = `mongodb://127.0.0.1:27017/nhlProjectDB`;

const hbs = exphbs.create({ helpers });

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(require("./controllers"));

mongodb.connect(
  connectionStringURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    db = client.db();
    app.listen(PORT, () => {
      console.log(`Example app listening at http://localhost:${PORT}`);
    });
  }
);

// app.listen(PORT, () => {
//   console.log(`Listening on Port http://localhost:${PORT}/home`);
// });
