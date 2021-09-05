const router = require('express').Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// UPDATE

router.put("/:id", async (req, res) => {
    if(req.body.userId === req.params.id) {
        if(req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                {$set: req.body},
                {new: true}
            );
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(401).json("You can update only your account")
    }
})

// Delete


// Get User

router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const {password, ...others} = user._doc;
        res.status(200).json(others);
    } catch (error) {
        res.status(500).json(error)
    }
})

// get Users
router.get("/", async (req, res) => {
    try {
        const allusers = await User.find({});
        res.status(200).json(allusers);
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;