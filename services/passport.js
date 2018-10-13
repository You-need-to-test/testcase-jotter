const passport = require("passport")
		, GoogleStrategy = require("passport-google-oauth20").Strategy
  	,	mongoose = require("mongoose");
const keys = require("../config/dev");
const User = mongoose.model("users");

passport.serializeUser( (user, done) => {
	done(null, user.id);
});

passport.deserializeUser( (id, done) => {
	User.findById(id).then(user => {
		done(null, user);
	});
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshTocken, profile, done) => {
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
					done(null, existingUser);
        } else {
          new User({
						googleId: profile.id,
						familyName: profile.name.familyName,
						givenName: profile.name.givenName,
						email: profile.emails[0].value
					})
					.save()
					.then(user => done(null, user));
        }
      });
    }
  )
);
