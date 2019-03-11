const passport = require("passport");

const db = require('../data/index')

module.exports = () => {
  passport.serializeUser((user, done) => {
    console.log(user +"this is serializeUser")
    done(null, user.id);
  });

  passport.deserializeUser((userid, done) => {
    console.log(userid)
    db.one("SELECT * FROM users WHERE id = ${userid}", {
      userid: userid
    })
      .then(user => {
        done(null, user.id);
      })
      .catch(err => {
        done(err, null);
      });
  });
};
