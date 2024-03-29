// const { create_post} = require("../models");
const db = require("../models");
const { Sequelize, Op, Model, DataTypes, where } = require("sequelize");
const config = require("../config/constant");


const sequelize = new Sequelize(config.DB, config.USER_DB, config.PASSWORD_DB, {
	host: "localhost",
	dialect: "mysql",
	pool: { min: 0, max: 10, idle: 10000 },
});

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const create_post = db.create_post;
// const users = db.users;


const Logindata = async (req, res) => {

      console.log(req.body);
      const playerdata = req.body.formData;
      const playerinputs = req.body.inputs;
      // try {
        // playerdata.address = playerinputs.address.formatted_address;
        // playerdata.lat = playerinputs.selectedLocation.lat;
        // playerdata.lng = playerinputs.selectedLocation.lng;
      // } catch (error) {
        // console.log("Error while getting address lat and lng");
      // }
    
      try {
        const newPlayer = await create_post.create(playerdata);
        console.log(playerdata);
        res.status(201).json(newPlayer);
      } catch (error) {
        console.error("Error creating player:", error);
        res.status(500).json({ message: "Error creating player" });
      }
    };



    const CreatePost = async (req, res) => {
      // console.log("test ", req.body);
        console.log(req.body.data,"boddy")
      let form = JSON.parse(req.body.data)
      let eventDate = JSON.parse(req.body.eventDate);
      let eventTime = JSON.parse(req.body.eventTime);
      let image =req.file.filename
      console.log(image,'img')
      
        // const playerinputs = req.body.inputs;
      const postdata = {
         name:form.name,
        eventVenue:form.eventVenue,
        category:form.category,
        image:image,
        eventDate:eventDate,
        eventTime:eventTime,
        addres:form.formatted_address,
      _lat:form.latitude,
        _lng:form.longitude,
        text:form.text,

   
      }
      

        try {
          const newdata = await create_post.create(postdata);
          console.log("newdata")
          // console.log(data);
          res.status(201).json(newdata);
        } catch (error) {
          console.error("Error creating post:", error);
          res.status(500).json({ message: "Error creating Post" });
        }
      };


const getCreatePost = async (req, res) => {
  const getPostdata = await create_post.findAll({
  }); // retrieve data from the database
  res.status(200).json(getPostdata); // send the retrieved data in the response
};

const getCreatePostbyid = async (req, res) => {
  const id =req.params.id
  const getPostdata = await create_post.findAll({
    where :{id:id} ,
    
  }); // retrieve data from the database
  res.status(200).json(getPostdata); // send the retrieved data in the response
};




const register = async (req, res) => {
  const { name, email, password } = req.body;
  console.log("IN REGISTER")

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required fields.' });
  }

  try {
    // Check if the user is already registered based on the email
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(409).json({ error: 'User with this email already exists.' });
    }

    // Save the user data in the database
    const user = await User.create({ name, email, password });

    if (user) {
      res.json({ message: 'User registered successfully.' });
    } else {
      res.status(500).json({ error: 'Failed to register user.' });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'An error occurred while registering the user.' });
  }
};


const login = async (req, res) => {
  const { email, password } = req.body;
  console.log("IN LOGIN", email , password)

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required fields.' });
  }

  try {
    // Find the user based on the provided email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    // Check if the password matches
    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    // Successful login
    res.json({ message: 'Login successful.' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during login.' });
  }
};










module.exports = {
  register,
  login,
    Logindata,
    CreatePost,
    getCreatePost,
    getCreatePostbyid,

}