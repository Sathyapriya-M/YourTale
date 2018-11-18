const mongoose= require('mongoose');
const Schema= mongoose.Schema;

// Create Schema
const StorySchema=new Schema({
    title:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    date:{
    type: Date,
    default: Date.now
  }
   
});

// Connecting Story model to StorySchema
mongoose.model('story', StorySchema)


