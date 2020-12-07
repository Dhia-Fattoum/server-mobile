const express = require('express');
const router = express.Router();
const {Followers} = require('../database1/models')
// const Sequelize = require('sequelize');

router.get("/getAuthor/:id", async (req, res) => {
    try {
      const followers = await Followers.findAll({
        where: { followerId: userId },
        include: {
        },
      });
      console.log(followers);
     return res.json(followers);
    } catch (error) {
      return res.status(500).send(error);
    }
  });
