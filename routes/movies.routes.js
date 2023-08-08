// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

// all your routes here
//GET /movies/create to show a form to create a movie/rederizar el formulario para la peli
router.get("/create", async (req, res, next) => {
  try {
    const allCelebrities = await Celebrity.find().select({ name: 1 });
    res.render("movies/new-movie.hbs", {
      allCelebrities,
    });
  } catch (error) {
    next(error);
  }
});

//POST /movies/create para enviar la data a la DB
router.post("/create", async (req, res, next) => {
  if (
    req.body.title === "" ||
    req.body.genre === "" ||
    req.body.cast === "" ||
    req.body.plot === ""
  ) {
    console.log("No has escrito nada");
    res.status(400).render("celebrities/new-celebrity.hbs", {
      error: "Rellene todos los campos plis",
    });
    return;
  }
  console.log("a new film", req.body);
  try {
    const newMovie = await Movie.create({
      title: req.body.title,
      genre: req.body.genre,
      plot: req.body.plot,
      cast: req.body.cast,
    });
    //  console.log("new movie created", newMovie)
    res.redirect("/movies");
  } catch (error) {
    next(error);
  }
});

// GET /movies to show all movies
router.get("/", async (req, res, next) => {
  try {
    const allMovies = await Movie.find().select({ title: 1 });
    res.render("movies/movies.hbs", {
      allMovies,
    });
  } catch (error) {
    next(error);
  }
});

// GET /movies/:id para los detalles de una peli
router.get("/:movieId", async (req, res, next) => {
  const { movieId } = req.params;

  try {
    const oneMovie = await Movie.findById(movieId).populate("cast");
    console.log("movieID", oneMovie);
    res.render("movies/movie-details.hbs", {
      oneMovie,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
