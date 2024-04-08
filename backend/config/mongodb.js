const mongoose = require('mongoose');
require("dotenv").config();



(async ()=>  {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.7vblkwj.mongodb.net/`)
        console.log("DB connected");
    } catch (error) {
        console.log(error);
    }
  })();

 // mongodb+srv://navdishjaggi:navdishjaggi@cluster0.7vblkwj.mongodb.net/