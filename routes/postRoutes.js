const express = require("express");
const route = express.Router();
const auth = require("../authMiddleware");

const Post = require("../models/postModel");

route.get("/", async(req, res) => {

    try {


        
        if (req.query.title) {
            
            const post = await Post.findOne({ title: req.query.title });
   

            res.send({ "msg": post })

        }
        else {

            const data = await Post.find();
            res.send({ "msg": data })

        }


    } catch (error) {
        res.send({ "msg": "error" })
    }
})



route.post("/add", auth, async (req, res) => {
    try {

        const post = await Post.create({ ...req.body, creator: req.userid, name: req.username });
        await post.populate("creator")
        res.send(post)


    } catch (error) {
        res.send({ "msg": "error" })
    }
})


route.delete("/delete/:id", auth, async (req, res) => {


    try {

        const post = await Post.findOne({ _id: req.params.id });
        console.log(post)

        if (post.creator.toString() === req.userid) {

            await Post.findOneAndDelete({ _id: req.params.id },{new:true});

            res.send("deleted");

        }
        else {

            res.send("You are not admin of the post");

        }





    } catch (error) {

        res.send({ "msg": "error" })

    }
})


route.patch("/update/:id", auth, async (req, res) => {


    try {

        const post = await Post.findOne({ _id: req.params.id });

        if (post.creator.toString() === req.userid) {

            await Post.findByIdAndUpdate({ _id: req.params.id }, req.body,{new:true})

            res.send("updated");

        }
        else {

            res.send("You are not admin of the post");

        }



    } catch (error) {

        res.send({ "msg": "error" })

    }
})



module.exports = route;