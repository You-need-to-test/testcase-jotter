const express = require("express")
    , mongoose = require("mongoose")
    , cookieSession = require("cookie-session")
    , passport = require("passport");
const keys = require("./config/dev");

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
app.use(passport.initialize());
app.use(passport.session());

if (typeof process.env.MONGODB_URI !== 'undefined' && process.env.MONGODB_URI.length > 0) {
	mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
}
else {
	mongoose.connect(keys.mongoURI, { useNewUrlParser: true });
}

/** ROUTES */
require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});