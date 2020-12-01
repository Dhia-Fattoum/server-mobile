const express = require('express') ;
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
var fileupload = require("express-fileupload");


// require('dotenv').config()
const server = require("http").createServer(app);
const PORT =process.env.PORT || 3000; 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


app.use(fileupload({
  useTempFiles: true,
}));

var cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name:'vic2021',
  api_key: '434786848137159',
  api_secret: '2SNCTyZOAMHIKCtYRmVuXqy-o_Y',
})

app.post("/upload", function(req, res, next) {
  const file = req.files.photo;
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
app.use('/Comment',require("./routes/comment.js"));
app.use('/Like',require("./routes/like.js"));
app.use('/Conversation',require("./routes/conversation.js"));
app.use('/Message',require("./routes/message.js"));


  

server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });