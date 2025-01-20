const jwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

module.exports = function(passport) {
  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    },
    async function(email, password, done) {
      try {
        const user = await User.findOne({ email });
        
        if (!user || ! await user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect email or password' });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  ));
  
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECURITY_KEY
  };

  passport.use(new jwtStrategy(jwtOptions, async (payload, done) => {
    try {
      const user = await User.findById(payload.id);
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  }));

  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  },
  async function(accessToken, refreshToken, profile, done) {
    try {
      let user = await User.findOne({ googleId: profile.id });
      if (!user) {
        user = await User.create({
          googleId: profile.id,
          email: profile.emails[0].value,
          displayName: profile.displayName
        });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }));
}
