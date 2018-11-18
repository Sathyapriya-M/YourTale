const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');

// Load Story Model
require('../models/Story');
const Story=mongoose.model('story') 

//Story Index page
router.get('/',(req,res)=>{
    Story.find({})
    .sort({date:'desc'})
    .then(stories=>{
        res.render('stories/index',{
            stories:stories
        })
    })
})
    

// Add Story Form
router.get('/add',(req,res)=>{
    res.render('stories/add');
});

//Edit Story Form
router.get('/edit/:id',(req,res)=>{
    Story.findOne({
        _id : req.params.id
    })
    .then(story => {
        res.render('stories/edit',{
            story : story
        });
    });
});

// Post story
router.post('/',(req,res)=>{
    let errors=[];
    if(!req.body.title){
        errors.push({text:'Please add title'})
    }
    if(!req.body.content){
        errors.push({text:'Please add content'})
    }
    if(errors.length > 0){
        res.render('stories/add',{
            errors : errors,
            title : req.body.title,
            content : req.body.content
        });
    } else {
        const newUser={
            title: req.body.title,
            content: req.body.content
        }
        new Story(newUser)
        .save()
        .then(story=>{
            req.flash('success_msg','Story added');
            res.redirect('/stories')
        })
    }
});
//Edit form process
router.put('/:id',(req,res)=>{
    Story.findOne({
        _id: req.params.id
    })
    .then(story=>{
        // new values
        story.title=req.body.title;
        story.content=req.body.content;

        story.save()
        .then(story=>{
            req.flash('success_msg','Story updated');
            res.redirect('/stories')
        })
    })
})
//Delete Story
router.delete('/:id',(req,res)=>{
    Story.remove({
        _id :req.params.id
    })
    .then(story=>{
        req.flash('success_msg','Story removed');
        res.redirect('/stories');
    });
});



module.exports=router;