const passport = require('passport');

module.exports = {
  authenticateJwt: passport.authenticate('jwt', { session: false }),
  authenticateLocal: passport.authenticate('local', { session: false }),
  authenticateGoogle: passport.authenticate('google', { session: false })
};
