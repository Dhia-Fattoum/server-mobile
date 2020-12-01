const express = require('express') ;
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
// require('dotenv').config()
const server = require("http").createServer(app);
const PORT =process.env.PORT || 3000; 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


app.use('/User', require("./routes/user.js"));
app.use('/Post',require("./routes/post.js"));
app.use('/Comment',require("./routes/comment.js"));
app.use('/Like',require("./routes/like.js"));
app.use('/Conversation',require("./routes/conversation.js"));
app.use('/Message',require("./routes/message.js"));


  

server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });