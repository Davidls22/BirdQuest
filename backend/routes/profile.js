const express = require('express');
const multer = require('multer');
const auth = require('../middleware/auth');
const User = require('../models/User');
const Post = require('../models/Post');

const router = express.Router();

// Route to get user information and their posts
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        const posts = await Post.find({ user: req.user.id });
        res.json({ user, posts });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
