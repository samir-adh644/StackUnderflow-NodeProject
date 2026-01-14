const express = require("express");
const authRoute = require('./routes/authRoutes');
const adminRoute = require('./routes/adminRoutes');
const questionRoute = require('./routes/questionRoutes');
const answerRoute = require('./routes/answerRoutes')
const app = express()
const PORT = 3000;

// external shits
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const session = require("express-session");
const flash = require("connect-flash");
const cookieParser= require('cookie-parser')
const {promisify} = require("util")
require("./model/index")



// always set it up in node start
app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())
// always set it up in node end

// dynamic navbar start
app.use(async(req,res,next)=>{
    const token = req.cookies.jwtToken
    try {
          const verifiedResult = await promisify(jwt.verify)(token,'Okay')
     if(verifiedResult)
     {
         res.locals.isAuthneticated = true
     }
     else{
         res.locals.isAuthneticated = false
     }
    }
    catch(error){
        res.locals.isAuthneticated=false
    }
   
   
    next()
})

// dynamic navbar end 


// flash setup start
    app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
    }));
    app.use(flash());
// flash setup end


// using routes start
app.use('/',authRoute)
app.use('/',adminRoute)
app.use('/',questionRoute)
app.use('/',answerRoute)
// using routes end





app.use(express.static('public/css/'));//accessing css file at public

// app.listen(PORT,(req,res)=>{
//     console.log("Server Started my friend!")
// })

module.exports = app