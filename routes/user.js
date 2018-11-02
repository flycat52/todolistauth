const express = require("express");
const router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const pool = require("../models/pool");
const User = require("../models/user");
const sessionstorage = require("sessionstorage");

// Register
router.get("/register", function(req, res) {
  res.render("register");
});

// Login
router.get("/login", function(req, res) {
  res.render("login");
});

// Register User
router.post("/register", async (req, res) => {
  // const name = req.body.name;
  const email = req.body.email;
  // const username = req.body.username;
  const password = req.body.password;
  const password2 = req.body.password2;

  // Validation
  // req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody("email", "Email is required").notEmpty();
  req.checkBody("email", "Email is not valid").isEmail();
  // req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody("password", "Password is required").notEmpty();
  req
    .checkBody("password2", "Passwords do not match")
    .equals(req.body.password);

  const errors = req.validationErrors();

  if (errors) {
    res.render("register", {
      errors: errors
    });
  } else {
    //checking for email is already taken
    const client = await pool.connect();
    const query = `select email from users where email = $1`;
    await client.query(query, [email], (err, result) => {
      if (result.rowCount !== 0) {
        res.render("register", {
          mail: email
        });
      } else {
        const newUser = { email: email, password: password };
        User.createUser(newUser, function(err, result) {
          if (err) throw err;
          console.log(result);
        });
        req.flash("success_msg", "You are registered and can now login");
        res.redirect("/user/login");
      }
    });
  }
});

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    function(email, password, done) {
      User.getUserByEmail(email, function(err, result) {
        if (err) throw err;
        if (result.rowCount === 0) {
          return done(null, false, { message: "Invalid email or password" });
        }
        //console.log(result.rows[0]);
        const userpassword = result.rows[0].password;

        User.comparePassword(password, userpassword, function(err, isMatch) {
          if (err) throw err;
          if (isMatch) {
            sessionstorage.setItem("userid", result.rows[0].userid);

            return done(null, true);
          } else {
            return done(null, false, { message: "Invalid email or password" });
          }
        });
      });
    }
  )
);

passport.serializeUser(function(user, done) {
  //console.log("serializeUser");
  //console.log(user); //true
  done(null, user, { email: user.email });
});

passport.deserializeUser(function(user, done) {
  //console.log("deserializeUser");
  // console.log(user);
  User.getUserByEmail(user.email, function(err, user) {
    done(err, user);
  });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/user/login",
    failureFlash: true
  }),
  function(req, res) {
    res.redirect("/");
  }
);

router.get("/logout", function(req, res) {
  req.logout();
  sessionstorage.clear();

  req.flash("success_msg", "You are logged out");

  res.redirect("/user/login");
});

module.exports = router;
