const mongoose= require('mongoose');
const Schema= mongoose.Schema;

// Create Schema
const UserSchema=new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password1:{
        type: String,
        required: true
    },
    date:{
    type: Date,
    default: Date.now
  }
   
});

// Connecting Story model to StorySchema
mongoose.model('users', UserSchema)


