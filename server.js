const express = require('express') ;
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
var fileupload = require("express-fileupload");
var cloudinary = require("cloudinary").v2;


require('dotenv').config()

const PORT = 3000; 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// helmet
// sequelize

app.use(fileupload({
  useTempFiles: true,
}));

cloudinary.config({
  cloud_name:'vic2021',
  api_key: '434786848137159',
  api_secret: '2SNCTyZOAMHIKCtYRmVuXqy-o_Y',
})

app.post("/uploadImage", function(req, res, next) {
  // console.log(req)
  const file = req.body;
  console.log(file);
  cloudinary.uploader.upload(file.tempFilePath, function(err, result) {
       res.send ({
          success: true,
          result
       });
  })
  // file.mv('./uploads/'+file.name, function(err,result){
  //   console.log(result)
  //   if (res) {
  //     res.send({
  //       success: true,
  //       message:'File uploaded successfully.'
  //     });
     
  //   }
  //   // throw err;
  // })
})
app.use('/User', require("./routes/user.js"));
app.use('/Post',require("./routes/post.js"));
app.use('/Media', require("./routes/media.js"));
app.use('/Adress', require("./routes/adress.js"));
app.use('/Comment',require("./routes/comment.js"));
app.use('/Like',require("./routes/like.js"));

app.get('/', function (req,res) {
  res.send('');
});



app.listen(process.env.PORT || PORT, () => {
    console.log(`listening on port http://localhost:${PORT}`);
  });