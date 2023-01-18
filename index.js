const express=require("express");
const app=express();
const port =5000;


const db = require('./config/mongoose');
const  Task  = require('./models/task');
//static files
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/img', express.static(__dirname + 'public/img'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use(express.urlencoded());



//template engine
app.set('views','./src/views');
app.set('view engine', 'ejs')

//routes
const homeRouter=require('./src/routes/home');
app.use('/',homeRouter);
app.get("/", function(req,res){
    res.render("home")
});
app.get("/src/views/home.ejs", function(req,res){
    res.render("home")
});

app.get("/src/views/todo.ejs#", function(req,res){
    res.render("home")
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
app.listen(port, function(){console.log("started the wepage");});




