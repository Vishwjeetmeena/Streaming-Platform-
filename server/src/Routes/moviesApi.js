import movieSchema from "../Database/models/movieSchema.js";
import authorization from "../middleware/authorisation.js";
import express from "express";
const route = express.Router();

//Create new moive
route.post("/add",authorization,async(req,res)=>{
    try {
        if(req.user.isAdmin === false) throw new Error("Adminstrative permission required");
        const newMovie = req.body;
        await movieSchema.create(newMovie);
        res.status(200).json({message:"Movie added successfully", success: true})
    } catch (error) {
        res.status(403).json({message: error.message, success: false})
    }
})

//Update movie
route.put("/update",authorization,async(req,res)=>{
    try {
        if(req.user.isAdmin === false) throw new Error("Adminstrative permission required");
        const data = req.body;
        const movieTitle = req.query.title;
        await movieSchema.update(data, {
            where: {
                title: movieTitle
            }
        });
        res.status(200).json({message:"Movie updated successfully", success: true});
    } catch (error) {
        res.status(403).json({message: error.message, success: false})
    }
})

//Delete movie
route.delete("/delete",authorization,async(req,res)=>{
    try {
        if(req.user.isAdmin === false) throw new Error("Adminstrative permission required");
        const movieTitle = req.query.title;
        const movie = await movieSchema.destroy({
            where: {
                title: movieTitle
            }
        });
        if (movie === 0) {
            return res.status(404).json({ message: "Movie not found", success: false });
        }
        res.status(200).json({message:"Movie Deleted successfully", success: true});
    } catch (error) {
        res.status(403).json({message: error.message, success: false})
    }
});

//Find specific movie
route.get("/find/:title",authorization, async(req,res)=>{
    try {
        const movieTitle = req.params.title;
        const movie = await movieSchema.findAll({
            where: {
              title: movieTitle
            }
        });
        if (movie === 0) {
            return res.status(404).json({ message: "Movie not found", success: false });
        }
        res.status(200).json({ message: movie, success: true });
    } catch (error) {
        res.status(500).json({message:"Oops, something went wrong",success: false})
    }
});

//Get all movies
route.get("/",authorization,async(req,res)=>{
    try {
        const movies = await movieSchema.findAll();
        res.status(200).json(movies)
    } catch (error) {
        res.send(error.message);
    }
})

export default route;