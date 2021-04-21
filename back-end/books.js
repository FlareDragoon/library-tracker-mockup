const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 10000000
  }
});

const users = require("./users.js");
const User = users.model;
const validUser = users.valid; 

    
  // Create a scheme for books
  const bookSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    title: String,
    author: String,
    genre: String,
    path: String,
  });
  const Book = mongoose.model('Book', bookSchema)

  //Save Book to database
  router.post('/', validUser, upload.single('photo'), async (req, res) => {
    // check parameters
    if (!req.file)
      return res.status(400).send({
        message: "Must upload a file."
      });
    
    const book = new Book({
      user: req.user,
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      path: "/images/" + req.file.filename,
    });
    try {
      await book.save();
      return res.sendStatus(200);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  });
  
  // Display Books
  router.get('/', validUser, async (req, res) => {
    try {
      let books = await Book.find({
        user: req.user
      }).sort({
        created: -1
      });
      res.send(books);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });
  
  // Delete Book from library
  router.delete('/:id', validUser, async (req, res) => {
    try {
      await Book.deleteOne({
        user: req.user,
        _id: req.params.id
      });
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });
  
  //Edit book title, author, genre
  router.put('/:id', validUser, async (req, res) => {
    try {
      let book = await Book.findOne({
        user: req.user,
        _id: req.params.id,
      });
      book.title = req.body.title;
      book.author = req.body.author;
      book.genre = req.body.genre;
      book.save();
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

  module.exports = {
    model: Book,
    routes: router,
  }