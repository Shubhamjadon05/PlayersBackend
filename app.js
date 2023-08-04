const express = require("express");
const app = express();
const path = require('path');

const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'images')));

const dotenv = require("dotenv");
dotenv.config();

app.get('/image/:image', (req, res) => {
    const image = req.params.image;
    // Determine the file path of the image
    const imagePath = path.join(__dirname, 'uploads',image);
  
    // Send the image file
    res.sendFile(imagePath);
  });

app.use("/create_post",require('./routes/create_post'));

const constant = require("./config/constant");
const port = process.env.PORT || constant.PORT;
app.listen(port, console.log("app is running " + constant.PORT));


