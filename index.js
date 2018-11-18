const express= require("express");
const exphbs=require("express-handlebars");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const methodOverride = require("method-override");
const flash=require("connect-flash");
const session=require("express-session");
const path=require("path");

const app=express();

//Load Routes
const stories=require('./routes/stories');
const users=require('./routes/users');

//Use Routes
app.use('/stories',stories);
app.use('/users',users);

//Map global promise -get rid of warning
mongoose.Promise = global.Promise;
//Connect to mongoose
mongoose.connect('mongodb://localhost/yourtale-dev',{

    useNewUrlParser: true
})
.then(()=>console.log('MongoDB Connected'))
.catch(err => console.log(err))

// for parsing application/json
app.use(bodyParser.json()); 
// for parsing application
app.use(bodyParser.urlencoded({ extended: true }));
//method-override middleware
app.use(methodOverride('_method'));
// express-session middleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))
// flash
app.use(flash())

//Static folder
app.use(express.static(path.join(__dirname,'public')))

//global variables
app.use((req,res,next)=>{
    res.locals.success_msg =req.flash('success_msg');
    res.locals.error_msg=req.flash('error_msg');
    res.locals.error=req.flash('error');
    next();
})

//handlebars Middleware  //to use handlebar template engine
app.engine('handlebars',exphbs({
    defaultLayout:'main'
}));
app.set('view engine', 'handlebars');

//Index Route
app.get('/',(req,res)=>{
    const title='Welcome';
    res.render('index',{
        title: title
    });
});
//About Route
app.get('/about',(req,res)=>{
    res.render('about');
})

const port=5000;

app.listen(port,()=>{
    console.log(`server started on port ${port}`)
});