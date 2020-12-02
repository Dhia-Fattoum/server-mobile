const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require('bcryptjs');
const {User} = require('../database1/models')
dotenv.config();
router.get('/', async (req, res) => {
    await User.findAll().then((users) => res.json(users))
  })

  router.get('/:id', async (req, res) => {
    //console.log(User)
      await User.findOne({ id: req.params.id })
  })
  
  router.post("/SignUp", async (req, res) => {
    console.log(req.body)
    const UserNameExist = await User.findOne({
      where: { userName: req.body.userName}
    });
    if(UserNameExist){
      return res.status(400).send("User already exist");
    };
    const phoneNumberExist = await User.findOne({
      where: { phoneNumber: req.body.phoneNumber},
    });
    if(phoneNumberExist){
      return res.status(400).send("User already exist");
    };
    const emailExist = await User.findOne({
      where: { email: req.body.email},
    });
    if(emailExist){
      return res.status(400).send("User already exist");
    };  
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
              profileImage: req.body.profileImage,
               coverImage: req.body.coverImage,
               address: req.body.address,
               city: req.body.city,
               country: req.body.country,
               zipCode: req.body.zipCode
    }).then((user) => res.json(user));
    console.log(user);
  });
  router.post("/login", async (req, res) => {
    const user = await User.findOne({ where: {userName: req.body.userName} });
    if (!user) return res.status(400).send("Invalid userName");
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send("Invalid password ");
    const token = jwt.sign({ id: user.id }, "" +process.env.SECRET_TOKEN);
    res.header('auth_token',token).send({'token':token , 'id':user.id})
    console.log(token)
  });
  router.put("/:id", async (req, res) => {
    User.findByPk(req.params.id).then((users) => {
      users
        .update({
          firstName:req.body.firstName,
            lastName: req.body.lastName,
            userName:req.body.userName,
            email: req.body.email,
             password: req.body.password,
              dateOfBirth: req.body.dateOfBirth,
               phoneNumber: req.body.phoneNumber,
                description: req.body.description,
                  profileImage: req.body.profileImage,
                   coverImage: req.body.coverImage,
                   isActif: req.body.isActif,
                   address: req.body.address,
                   city: req.body.city,
                   country: req.body.country,
                   zipCode: req.body.zipCode
        })
        .then((users) => {
          res.json(users);
        });
    });
  });
  module.exports = router;
