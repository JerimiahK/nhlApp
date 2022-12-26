const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");

const app = express();
const PORT = process.env.PORT || 3001;

app.engine("handlebars", exphbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log(`Listening on Port http://localhost:${PORT}`);
});
