const express = require("express")
    , mongoose = require("mongoose")
    , cookieSession = require("cookie-session")
    , passport = require("passport")
    , bodyParser = require("body-parser");
const keys = require("./config/keys");
const logger = require('morgan');

/** MODELS */
require("./models/User");
require("./services/passport");

const app = express();

app.use( 
  cookieSession({
    maxAge: 10000000,
    keys: [keys.cookieKey]
  })
);
app.use(logger('dev'));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));

if (typeof process.env.MONGODB_URI !== 'undefined' && process.env.MONGODB_URI.length > 0) {
	mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
}
else {
	mongoose.connect(keys.mongoURI, { useNewUrlParser: true });
}
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

/** ROUTES */
require("./routes/authRoutes")(app);
require("./routes/projectRoutes")(app);
require("./routes/libraryRoutes")(app);
require("./routes/suiteRoutes")(app);
require("./routes/testcaseRoutes")(app);
// require("./routes/teststepRoutes")(app);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});

