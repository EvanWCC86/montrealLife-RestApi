const router = require("express").Router();
const HousePost = require("../models/HousePost");
const User = require("../models/User");




// get all posts
router.get("/", async (req, res) => {
    try {
        const posts = await HousePost.find();
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json(error)
    }
})


// create a post

router.post("/", async (req, res) => {
    const newPost = new HousePost(req.body)
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (error) {
       res.status(500).json(error); 
    }
})

// update a post
router.put("/:id", async (req, res) => {
    try {
        const post = await HousePost.findById(req.params.id);
        if(post.userId === req.body.userId) {
            await post.updateOne({$set: req.body});
            res.status(200).json("the post has been updated");
        } else {
            res.status(403).json("you can only update your post")
        }
    } catch (error) {
        res.status(500).json(error);
    }
})

// delete a post

router.delete("/:id", async (req, res) => {
    try {
        const post = await HousePost.findById(req.params.id);
        if(post.userId === req.body.userId) {
            await post.deleteOne();
            res.status(200).json("the post has been deleted");
        } else {
            res.status(403).json("you can delete only your post");
        }
    } catch (error) {
        res.status(500).json(err);
    }
})

// like or dislike a post

router.put("/:id/like", async (req, res) => {
    try {
        const post = await HousePost.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)) {
            await post.updateOne({$push: {likes: req.body.userId}});
            res.status(200).json("the post has been liked");
        } else {
            await post.updateOne({$pull: { likes: req.body.userId}});
            res.status(200).json("The post has been disliked");
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

// get a post

router.get("/:id", async (req, res) => {
    try {
        const post = await HousePost.findById(req.params.id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
});


module.exports = router
