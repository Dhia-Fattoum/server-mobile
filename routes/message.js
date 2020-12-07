const express = require("express");
const router = express.Router();
const { Message,User } = require("../database1/models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
router.get("/", async (req, res) => {
  await Message.findAll()
    .then((message) => res.json(message))
    .catch((err) => console.log(err));
});
// get message by conv id
router.get("/mymessage/:id", async (req, res) => {
  try {
    const message = await Message.findAll({
      where: { conversationId: req.params.id },
      include: {
        model: User,
        required: true,
        attributes: ["profileImage","userName"],
      },
    });
    console.log(message);
   return res.json(message);
  } catch (error) {
    return res.status(500).send(error);
  }
});

// router.get("/:id", async (req, res) => {
//   await Message.findByPk(req.params.id)
//     .then((message) => res.json(message))
//     .catch((err) => console.log(err));
// });
//add message
router.post("/addMessage", async (req, res) => {
    try {
        console.log(req.body);
        const {content,fileUrl,conversationId,userId} = req.body
        const msg = await Message.create({
          userId,
          content,
          conversationId,
          fileUrl
        })
          return res.json(msg)
    } catch (error) {
        return res.status(500).send(error)
    }
 
});

// router.put("/:id", async (req, res) => {
//   await Message.findByPk(req.params.id)
//     .then((message) => {
//       message
//         .update({
//           content: req.body.content,
//           fileUrl: req.body.fileUrl,
//         })
//         .then((message) => {
//           res.json(message);
//         });
//     })
//     .catch((err) => console.log(err));
// });

router.delete("/:id", async (req, res) => {
  await Message.findByPk(req.params.id)
    .then((message) => {
      message.destroy();
    })
    .then(() => {
      res.json("deleted");
    })
    .catch((err) => console.log(err));
});
module.exports = router;
