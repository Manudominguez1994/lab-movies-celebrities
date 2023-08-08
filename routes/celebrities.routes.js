

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
//Requerimos nuestro modelo
const Celebrity = require("../models/Celebrity.model")
// all your routes here
//GET /celebrities/create => renderizar el formulario para crear nuestras celebrities
router.get("/create", (req ,res ,next)=>{
    res.render("celebrities/new-celebrity.hbs")
})
//POST /celebrities/create => Creara nuestra celebrity en la DB
router.post("/create",async(req, res, next)=>{
    if(req.body.name === "" || req.body.occupation==="" || req.body.catchPhrase===""){
        console.log("No has escrito nada");
        res.status(400).render("celebrities/new-celebrity.hbs",{
            error: "Rellene todos los campos plis"
        })
        return;
    }
    try {
        await Celebrity.create({
            name: req.body.name,
            occupation: req.body.occupation,
            catchPhrase: req.body.catchPhrase
        })
        res.redirect("/celebrities")
    } catch (error) {
        next(error)
    }
})
//GET /celebrities => renderiza la vista de todas nuesta celebrities
router.get("/",async(req, res, next)=>{
    try {
        const allCelebrities = await Celebrity.find().select({name:1})
        res.render("celebrities/celebrities.hbs",{
            allCelebrities
        })
    } catch (error) {
        next(error)
    }
})
module.exports = router;