const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const hbs = require("hbs");
const Register = require("./models/User.js");
const Info = require("./models/ProfileInfo.js")

mongoose.connect("mongodb://127.0.0.1:27017/registrationform").then(()=>{
    app.listen(8000, ()=>{
        console.log("listening to the port at 8000");
    })
}).catch(()=>{
    console.log("connection unsuccessful");
})

const app = express();
app.use(express.urlencoded({extended: false}))
app.use(express.json()); 

const staticPath = path.join(__dirname,"../public");
const templatePath = path.join(__dirname,"../templates/views");
const partialsPath = path.join(__dirname,"../templates/partials");

app.use(express.static(staticPath));
app.set("view engine","hbs");
app.set("views", templatePath);
hbs.registerPartials(partialsPath);
app.set('view engine', 'ejs');

app.get("/", (req, res)=>{
    res.render("index");
})

app.get("/signup", (req, res)=>{
    console.log("singh");      
    res.render("signup");
})

app.post("/signup", async(req, res)=>{
   
    try{

     const password = req.body.password;   
     const cpassword = req.body.confirmPassword;
   
     if(password === cpassword){
    
       const RegisterUser = new Register({
        
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: cpassword
        
       })
     
       const registered = await RegisterUser.save();

       return res.status(201).render("login");
     }

    }catch(err){
        
        return res.status(400).send(err);
    }
})

app.get("/login", async(req, res)=>{
   res.render("login");
   
});

app.post("/login", async(req, res)=>{    
    
    const email = req.body.email;
    const password = req.body.password;

    const result = await Register.findOne({email:email});  
    if(password==result.password){
    
        try{
            console.log("kashish");
            const data = await Register.find({});
            console.log(data);
            res.render('main', {data });

            console.log("singh");
            
         }catch(err){
            console.log(err);
         }

    }else{
        console.log("password is incorrect");
    }
});

app.get("/main", async(req, res)=>{
   
    res.render("main");
})

app.get("/profile", (req,res)=>{
    res.render("profile");
})


app.post("/profile",async(req, res)=>{
    try{
        console.log(req.body.name);
        const RegisterInfo = new Info({
        
            name: req.body.name,
            email: req.body.email,
            githubLink: req.body.github,
            Bio: req.body.bio

           })
           const result = await RegisterInfo.save();
           return res.status(201).render("main");

    }catch(err){
        return res.status(400).send(err);
    }
});
