const express=require("express");
const app=express();
const port =process.env.PORT  || 5000;
const http=require("http");
const hostname='0.0.0.0';

const mongoose=require('mongoose');
const server = http.createServer((req,res)=>{
    res.statusCode=200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Zeet Node');
});

const db = 'mongodb+srv://nodejs-focus-web:27Nov2001.@cluster0.oe7iomc.mongodb.net/nodejs-focus-web?retryWrites=true&w=majority'
mongoose.connect(db).then(() => {
    console.log("connscted to mongooseatlas");
}).catch((err)=> console.log("error"));


const  Task  = require('./models/task');
//static files
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/img', express.static(__dirname + 'public/img'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use(express.urlencoded());



//template engine
app.set('views','./docs');
app.set('view engine', 'ejs')

//routes
app.get("/", function(req,res){
    res.render("./index.ejs")
});

app.get("/src/views/index.ejs", function(req,res){
    res.render("index")
});

app.get("/src/views/index.ejs#", function(req,res){
    res.render("index")
});










app.get('/src/views/todo.ejs', function(req, res){
    Task.find({}, function(err, task){
        if(err){
            console.log('Error in fetching tasks from db');
            return;
        }

        return res.render('todo', {
            tittle: "ToDo list",
            task: task
        });
    }
)});


// creating Tasks
app.post('/create-task', function(req, res){
  //  putting data into the database with the Task schema
    
    Task.create({
        description: req.body.description,
        category: req.body.category,
        date: req.body.date
        }, function(err, newtask){
        if(err){console.log('error in creating task', err); return;}
        

        //console.log(newtask);
        return res.redirect('back');

    });
});


// deleting Tasks
app.get('/delete-task', function(req, res){
    // get the id from query
    var id = req.query;

    // checking the number of tasks selected to delete
    var count = Object.keys(id).length;
    for(let i=0; i < count ; i++){
        
        // finding and deleting tasks from the DB one by one using id
        Task.findByIdAndDelete(Object.keys(id)[i], function(err){
        if(err){
            console.log('error in deleting task');
            }
        })
    }
    return res.redirect('back'); 
});

// make the app to listen on asigned port number
app.listen(3000, function(err){
    if(err){
        console.log('Error in running the server : ${err}');
    }

    console.log('Server is running on port : ${port}');
});





app.get("*", function(req,res){
    res.render("fzf")
});





//listen
app.listen(port, hostname, function(){console.log("started the wepage");});




