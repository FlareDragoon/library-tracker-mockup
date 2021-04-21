const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

const users = require("./users.js");
const User = users.model;
const validUser = users.valid;

// Create a scheme for genres 
const genreSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  genreName: String,
});
const Genre = mongoose.model('Genre', genreSchema)

router.post('/', validUser, async (req, res) => {
    const genre = new Genre({
      user: req.user,
      genreName: req.body.genreName,
    });
    try {
      await genre.save();
      res.send(genre);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

  router.get('/', validUser, async (req, res) => {
    try {
      let genres = await Genre.find({
        user: req.user
      }).sort({
        created: -1
      }).populate('user');
      res.send(genres);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

  module.exports = {
    model: Genre,
    routes: router,
  }