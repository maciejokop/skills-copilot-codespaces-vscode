// Create web server
// Require express
const express = require('express');
// Create an express app
const app = express();
// Require body-parser
const bodyParser = require('body-parser');
// Require cors
const cors = require('cors');
// Require mongoose
const mongoose = require('mongoose');
// Require Comment model
const Comment = require('./models/Comment');
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/comments', { useNewUrlParser: true });

// Use bodyParser
app.use(bodyParser.json());
// Use cors
app.use(cors());

// Get all comments
app.get('/comments', async (req, res) => {
    const comments = await Comment.find();
    res.json(comments);
});

// Create a new comment
app.post('/comments', async (req, res) => {
    const comment = new Comment(req.body);
    await comment.save();
    res.json(comment);
});

// Update a comment
app.put('/comments/:id', async (req, res) => {
    const { id } = req.params;
    const comment = await Comment.findByIdAndUpdate(id, req.body, { new: true });
    res.json(comment);
});

// Delete a comment
app.delete('/comments/:id', async (req, res) => {
    const { id } = req.params;
    await Comment.findByIdAndDelete(id);
    res.json({ message: 'Comment deleted' });
});

// Start the server
app.listen(3000, () => {
    console.log('Server started');
});