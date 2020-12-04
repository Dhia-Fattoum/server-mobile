const express = require('express');
const router = express.Router();
const {Like} = require('../database1/models')
const Sequelize = require('sequelize');
const Op=Sequelize.Op


//add a like
router.post('/addLike', async(req, res) => {
    console.log(req.body)
    await Like.create({
            PostId: req.body.PostId,
            userId: req.body.userId,
            like : req.body.like,
        })
        .then((likes) => res.json(likes))
        .catch((err) => console.log(err))
})

//get all likes by post id
router.get("/likes/:userId", async (req, res) => {
    await Like.findAll({
      where: { postId: req.params.postId },
    }).then((like) => res.json(like))
      .catch((err) => console.log(err));
  });

//delete like
router.delete('/:id', async(req, res) => {
    await Like.findByPk(req.params.id).then((likes) => {
            likes.destroy();
        }).then(() => {
            res.json("deleted");
        })
        .catch((err) => console.log(err))
});


//delete all like for a sepecific user id
router.delete('/', async(req, res) => {
    const userId=req.body.userId;
    var condition = userId ? { userId: { [Op.like]: `%${userId}%` } } : null;
    await Like.destroy({ where: {condition}, truncate: true }).then(() => res.json("cleared"))
        .catch((err) => console.log(err))
});


module.exports = router;