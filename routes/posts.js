const express = require('express');
const router = express.Router();
const Post = require('../models/Post')

//GET BACK ALL THE POSTS
router.get('/', async (req,res) => {
    try {
        const posts = await Post.find();
        res.json(posts)
    } catch(err){
        res.json(err.message)
    }
})


//SUBMIT A POST
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    })
    try{
        const savedPost = await post.save()
        res.status(200).json(savedPost)
    }
    catch(err){
        res.status(500).json(err.message)
    }
});

//SPECIFIC POST
router.get('/:postId', async (req,res) => {
    const id = req.params.postId
    try {
        const post = await Post.findById(id)
        res.json(post)
    }catch(err){
        res.json(err.message)
    }
});

//DELETE POST
router.delete('/:postId', async (req,res) => {
    try{
        const removedPost = await Post.remove({_id: req.params.postId})
        res.json(removedPost)
    }
    catch(err) {
        res.json(err.message)
    }
});

//UPDATE A POST
router.patch('/:postId', async (req,res) => {
    try{
        const updatedPost = await Post.updateOne(
            {_id: req.params.postId}, 
            {$set:  {title: req.body.title}}
            )
        res.json(updatedPost)
    }
    catch(err) {
        res.json(err.message)
    }
});

module.exports = router;