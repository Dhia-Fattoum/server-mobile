const express = require("express");
const router = express.Router();
const { Conversation, User } = require("../database1/models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

// get all conv by user id
router.get("/myConversation/:userId", async (req, res) => {
  await Conversation.findAll({
    where:{id:req.params.userId},include: {model:User,required: true},
  }).then((conversation) => res.json(conversation))
    .catch((err) => console.log(err));
});
//get conv by conv id
router.get("/:id", async (req, res) => {
  await Conversation.findByPk(req.params.id)
    .then((conversation) => res.json(conversation))
    .catch((err) => console.log(err));
}); 
//add new conversation
router.post("/addConversation", async (req, res) => {
  try {
    const targetId = req.body.targetId;
    const userId = req.body.userId;
    if(userId===targetId) return res.status(400).send("qsd")
    let convUser = await User.findOne({where:{id:userId},include: {model:Conversation,required: true}})
    convUser=convUser.Conversations.map(c=>c.id);
    console.log(convUser)
    const convTarget = await User.findOne({where:{id:targetId,"$Conversations.id$":convUser},include: {model:Conversation,required: true}})
      
    if (!convTarget) {
      const conv = await Conversation.create({});
      const recever = await User.findByPk(targetId);
      const sender = await User.findByPk(userId);
      await sender.addConversation(conv);
      await recever.addConversation(conv);
      return res.json(conv.id);
    } else {
      return res.json(convTarget.Conversations[0]);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }

});





//delete a conv by conv id
router.delete("/:id", async (req, res) => {
  await Conversation.findByPk(req.params.id)
    .then((conversation) => {
      conversation.destroy();
    })
    .then(() => {
      res.json("deleted");
    })
    .catch((err) => console.log(err));
});



module.exports = router;
