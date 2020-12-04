const express = require('express');
const router = express.Router();
const {Post,User} = require('../database1/models')
const Sequelize = require('sequelize');



//get all posts 
router.get('/', async(req, res) => {
    await Post.findAll({
        include: {model:User,required: true,
            attributes:["userName","profileImage"]}
    }).then((post) => res.json(post))
        .catch((err) => console.log(err))
})



//get post by user id//
router.get('/myPost/:userId', async(req, res) => {
    try{
      const postId = await Post.findByPk({
      where: { userId: req.params.userId},
      include: {
      model: User, 
      required: true,
      attributes:["userName","profileImage"]
},
      })     
        console.log(postId);
        return res.json(postId);
    } catch (error) {
        return res.status(500).send(error)
    }
})
//add a post
router.post('/addPost', async(req, res) => {
    try{
        const {content,userId,fileUrl}=req.body;
        console.log(req.body)
 const createPost =await Post.create({
            content, 
            userId,
            fileUrl,
        
        })
return res.json(createPost)
}catch(error) {
    return res.status(500).send(error)
}
});

//update post
router.put('/:id', async(req, res) => {
    Post.findByPk(req.params.id).then(() => {
        post.update({
            content: req.body.content,
           
            }).then((post) => {
                res.json(post);
            });
        })
        .catch((err) => console.log(err))
})


//delete post
router.delete('/:id', async(req, res) => {
    await Post.findByPk(req.params.id).then((post) => {
            post.destroy();
        }).then(() => {
            res.json("deleted");
        })
        .catch((err) => console.log(err))
});



module.exports = router;