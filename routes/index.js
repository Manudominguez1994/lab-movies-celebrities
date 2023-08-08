const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

const celebrityRouter = require("./celebrities.routes.js")
router.use("/celebrities",celebrityRouter)

const movieRouter = require("./movies.routes.js")
router.use("/movies",movieRouter)

module.exports = router;
