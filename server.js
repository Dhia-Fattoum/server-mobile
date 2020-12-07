const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
var fileupload = require("express-fileupload");
var cloudinary = require("cloudinary").v2;



// require('dotenv').config()
const server = require("http").createServer(app);
const PORT = process.env.PORT || 3000;

// socket io
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

//socket connect
io.on("connection", socket => {
    console.log("a user connected :D");
    socket.on("chat message", msg => {
      console.log(msg);
      io.emit("chat message", msg);
    });
  });

app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

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
app.use('/Comment',require("./routes/comment.js"));
app.use('/Like',require("./routes/like.js"));
app.use('/Conversation',require("./routes/conversation.js"));
app.use('/Message',require("./routes/message.js"));

app.get("/", (req, res) => {
  res.send("hello");
});

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
