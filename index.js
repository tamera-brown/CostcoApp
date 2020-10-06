const express= require('express');
const path=require('path');
const app =express();
const exphbs=require('express-handlebars');
const members=require('./MemberList');

const logger=require("./Middleware/middleware");

// init middleware
app.use(logger);

//Handlebars Middleware
app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

//Home page route
app.get('/',(req,res)=>res.render('index', {
    title:"Costco Member Registration",
    members
})
);

//Body Parser Middleware
app.use(express.json());
// Handle form data
app.use(express.urlencoded({extended:false}));


//Set a static folder
app.use(express.static(path.join(__dirname,"public")));

//Member API routes
app.use('/api/members',require('./Routes/Apis/members'));


// Display on browser

// app.get('/',(req,res)=>{
//     res.sendFile(path.join(__dirname,'public','index.html'))
//    // res.send('<h1> Hello World!! </h1>');
// });

const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>console.log(`Server started on Port: ${PORT}`));