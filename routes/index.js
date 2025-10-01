const passport = require("passport");

const router = require("express").Router();

//router.use("/", require("./swagger"));

//router.use("/", require("./"));
//router.use("/", require("./"));
router.use("/countries", require("./countries"));
router.use("/landmarks", require("./landmarks"));

router.get("/login", passport.authenticate("github", (req, res) => {}));

router.get("/logout", function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

module.exports = router;