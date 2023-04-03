const express = require("express")
const animeListRouter = express()
const Anime = require('../models/anime.js')

animeListRouter.route("/")
    .get((req, res, next) => {
        Anime.find((err, animes) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(animes)
        })
    })

    .post((req, res, next) => {
        const newAnime = new Anime(req.body)
        newAnime.save((err, savedAnime) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(savedAnime)
        })
    })

animeListRouter.delete("/:animeId", (req, res) => {
    Anime.findOneAndDelete({_id: req.params.animeId}, (err, deletedAnime) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(`Successfully deleted ${deletedAnime} from the list`)
    })
})

animeListRouter.put("/:animeId", (req, res, next) => {
    Anime.findOneAndUpdate(
        { _id: req.params.animeId },
        req.body,
        {new: true},
        (err, updatedAnime) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedAnime)
        }
    )
})

animeListRouter.get("/search/genre", (req, res, next) => {
    Anime.find({genre: req.query.genre}, (err, animes) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(animes)
    })
})

animeListRouter.get("/:animeId", (req, res, next) => {
    
    
    Anime.find({_id: req.params.animeId}, (err, foundAnime, next) => {
        if (err) {
            res.status(500) 
            return next(err)
        }
        return res.status(200).send(foundAnime)
    })

}

)

module.exports = animeListRouter