const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');

// Load Users model
require('../models/Users');
const User=mongoose.model('users')

//User Login Route
router.get('/login',(req,res)=>{
    res.render('users/login')
})

//User Register Route
router.get('/register',(req,res)=>{
    res.render('users/register')
})

//Register for m Post
router.post('/register',(req,res)=>{
    console.log(req.body.name);
    res.send('ih')
})
module.exports=router;