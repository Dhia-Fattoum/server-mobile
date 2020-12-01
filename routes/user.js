const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const {User} = require('../database1/models')


router.get('/', async (req, res) => {
    await User.findAll().then((users) => res.json(users))
  })

  router.get('/:id', async (req, res) => {
    console.log(User)
      await User.findOne({ id: req.params.id })
  })
  
  router.post("/SignUp", async (req, res) => {
    const emailExist = await User.findOne({
      where: { email: req.body.email },
    });
    if (emailExist) return res.status(400).send("Email already exist");
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName:req.body.userName,
        email: req.body.email,
        password: hashPassword,
        dateOfBirth: req.body.dateOfBirth, 
        phoneNumber: req.body.phoneNumber,
        description: req.body.description,
        QrCode: req.body.QrCode,
        profileImage: req.body.profileImage,
        coverImage: req.body.coverImage,
    }).then((user) => res.json(user));
    console.log(user);
  });
  router.post("/login", async (req, res) => {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) return res.status(400).send("Email is not found");
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send("Invalid password ");
    return res.status(200).send("welcome");
  });
  router.put("/:id", async (req, res) => {
    User.findByPk(req.params.id).then((users) => {
      users
        .update({
            lastName: req.body.lastName,
            userName:req.body.userName,
            email: req.body.email,
             password: req.body.password,
              dateOfBirth: req.body.dateOfBirth,
               phoneNumber: req.body.phoneNumber,
                description: req.body.description,
                 QRCode: req.body.QRCode,
                  profileImage: req.body.profileImage,
                   coverImage: req.body.coverImage,
        })
        .then((users) => {
          res.json(users);
        });
    });
  });
  router.delete("/:id", async (req, res) => {
    await User.findByPk(req.params.id)
      .then((user) => {
        user.destroy();
      })
      .then(() => {
        res.json("deleted");
      });
  });
  module.exports = router;
