const express = require("express");
const router = express.Router();
const { Conversation, User } = require("../database1/models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

// get all conv by user id
router.get("/myConversation/:userId", async (req, res) => {
  console.log(req.params.userId);
  Conversation.findAll({
    include: { model: User, required: true },
    where: { "$Users->UserConversations.userId$": req.params.userId },
  }).then((conversation) => {
    console.log(conversation);
    if (conversation.length === 0) return res.json([]);
    const conv = conversation.map((c) => c.id);
    User.findAll({
      include: { model: Conversation, required: true },
      where: { "$Conversations.id$": conv },
    }).then((ress) => {
      console.log(ress);
      res.json(ress);
    }).catch((err) => console.log(err));
  });
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
    if (userId === targetId)
      return res.status(400).send("you cant send a message to your selfe");
    let convUser = await User.findOne({
      where: { id: userId },
      include: { model: Conversation, required: true },
    });
    // return res.json(convUser)
    if (!convUser) {
      let checkTarget = await User.findByPk(targetId);
      if (!checkTarget) return res.status(400).send("target err");
      console.log(789);
      const conv = await Conversation.create({});
      const recever = await User.findByPk(targetId);
      const sender = await User.findByPk(userId);
      await sender.addConversation(conv);
      await recever.addConversation(conv);
      console.log(123);
      return res.json(conv.id);
    }
    convUser = convUser.Conversations.map((c) => c.id);
    console.log(convUser);
    const convTarget = await User.findOne({
      where: { id: targetId, "$Conversations.id$": convUser },
      include: { model: Conversation, required: true },
    });

    if (!convTarget) {
      const conv = await Conversation.create({});
      const recever = await User.findByPk(targetId);
      const sender = await User.findByPk(userId);
      await sender.addConversation(conv);
      await recever.addConversation(conv);
      console.log(123);
      return res.json(conv.id);
    } else {
      return res.json(convTarget.Conversations[0].id);
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

router.get("/", async (req, res) => {
  await Conversation.findAll().then((users) => res.json(users));
});
module.exports = router;
