const express = require("express");
const bodyParser = require("body-parser");
const monoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const cores = require("cors");
const User = require("./models/user");
const Order = require("./models/order");
require('dotenv').config()

const app = express();
const port = process.env.PORT || 3001;

app.use(cores());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// connect to db
monoose
  .connect(
    process.env.DB_URL
  )
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error while connection the Databse", error);
  });

// generating secrete key 
const generateSecreteKey = () => {
  const SECRET_KEY = crypto.randomBytes(32).toString('hex');

  return SECRET_KEY;
}

const SECRET_KEY = generateSecreteKey();

// function to sending verification email
const sendVerificationEmail = async (email, verificationToken) => {
  // create a node mailer transporter
  const transporter = nodemailer.createTransport({
    // configure the email services
    service: "gmail",
    auth: {
      user: "shivbhankushwaha862003672001@gmail.com",
      pass: "tazr btgu wubg wlpb",
    },
  });

  // compose the email massage
  const mailOptions = {
    from: "amazon.com",
    to: email,
    subject: "Please Verify your Email Account!",
    text: `Please click the following links to verify your mail : https://myshop-backend-k7sa.onrender.com/verify/${verificationToken}`,
  };

  // send the email to user
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("Error sending the verification email", error);
  }
};

// endpoints to register in the app
app.post("/register", async (req, res) => {
  try {
    // create a new user with given data
    const { name, email, password } = req.body;
    
    // check that email is exist or not
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email Already existing" });
    }

    // create a new user both are valid
    // const newUser = new User(req.body)
    const newUser = new User({ email, name, password });

    // generate verification token using crypto
    newUser.verificationToken = crypto.randomBytes(20).toString("hex");

    // save the user to the data base
    await newUser.save();

    // send verification email to user email
    sendVerificationEmail(newUser.email, newUser.verificationToken);

    res.status(200).json({message:"Successfull registered"})
  } catch (error) {
    console.log("Error occured while register", error);
    res.status(500).json({ message: "registration failed" });
  }
});


// endspoint to verify the email
app.get("/verify/:token", async (req,res) => {
    // find the user by the given token and update the verified property
    try{
        const token = req.params.token;

        // find the user within the given verification token
        const user = await User.findOne({verificationToken:token});

        if(!user){
            return res.status(404).json({message:"Invalid verification token"});
        }

        // mark the user as verified
        user.verified = true;
        user.verificationToken = undefined;

        await user.save();

        res.status(200).json({message:"Email verified successfully"})
    } 
    catch(error){
        res.status(500).json({message:'Email verification failed'})
    }
})

// endpoints to login to user
app.post("/login",async (req,res) => {
  try{
    const {email,password} = req.body;

    // check if the user exist
    const user = await User.findOne({email})

    if(!user){
      return res.status(401).json({message:"Invalid email or password"});
    }

    // check if the password is correct
    if(user.password !== password){
      res.status(401).json({message:"Invalid Password or Email"});
    }

    // generate a token
    const token = jwt.sign({userId:user._id},SECRET_KEY);
    
    res.status(200).json({token})
  }
  catch(error){
    res.status(500).json({message:'Login Failed'})
  }
})


// endpoints to save a new address to the backend
app.post("/addresses", async (req, res) => {
  try {
    const { userId, address } = req.body;

    //find the user by the Userid
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //add the new address to the user's addresses array
    user.addresses.push(address);

    //save the updated user in te backend
    await user.save();

    res.status(200).json({ message: "Address created Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error addding address" });
  }
});

//endpoint to get all the addresses of a particular user
app.get("/addresses/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const addresses = user.addresses;
    res.status(200).json({ addresses });
  } catch (error) {
    res.status(500).json({ message: "Error retrieveing the addresses" });
  }
});

//endpoint to store all the orders
app.post("/orders", async (req, res) => {
  try {
    const { userId, cartItems, totalPrice, shippingAddress, paymentMethod } =
      req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //create an array of product objects from the cart Items
    const products = cartItems.map((item) => ({
      name: item?.title,
      quantity: item.quantity,
      price: item.price,
      image: item?.image,
    }));

    //create a new Order
    const order = new Order({
      user: userId,
      products: products,
      totalPrice: totalPrice,
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod,
    });

    await order.save();

    res.status(200).json({ message: "Order created successfully!" });
  } catch (error) {
    console.log("error creating orders", error);
    res.status(500).json({ message: "Error creating orders" });
  }
});

// get orders by userId
app.get('orders/:userId',async (req,res) => {
  try{
    const userId = req.params.userId;

    const orders = await Order.find({user:userId}).populate('user')

    if(!orders || orders.length === 0){
      return res.status(404).json({message:"no order found for that users"})
    }

    res.status(200).json({orders})
  }
  catch(err){
    res.status(500).json({message:"Error"})
  }
})

//get the user profile
app.get("/profile/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving the user profile" });
  }
});

app.get("/orders/:userId",async(req,res) => {
  try{
    const userId = req.params.userId;

    const orders = await Order.find({user:userId}).populate("user");

    if(!orders || orders.length === 0){
      res.status(404).json({message:"No orders found for this user"})
    }

    res.status(200).json({ orders });
  } catch(error){
    res.status(500).json({ message: "Error"});
  }
})

app.get('/', (req, res) => {
  return res.json({message : "hello from server"});
})

app.listen(port, () => {
  console.log(`Listening in the port number ${port}`);
});
