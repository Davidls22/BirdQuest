const express = require('express');
const multer = require('multer');
const auth = require('../middleware/auth');
const Post = require('../models/Post');

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage });

router.post('/', [auth, upload.single('image')], async (req, res) => {
    const { title, description, location } = req.body;
    try {
        const newPost = new Post({
            title,
            description,
            location,
            image: req.file ? req.file.path : '',
            user: req.user.id
        });
        const post = await newPost.save();
        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().populate('user', ['name', 'avatar']);
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
