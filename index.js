var express    = require("express");
var passport   = require("passport");
var router     = express.Router();
var User       = require("../models/user.js");



// root route
router.get("/",function(req,res){
    res.render("landing");
})


//show register form route
router.get("/register",function(req, res) {
    res.render("register");
})

//handle sign up logic 
router.post("/register",function(req, res) {
    var newUser = new User({username:req.body.username});
    User.register(newUser,req.body.password,function(err,user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req,res,function(){
            res.redirect("/campgrounds");
        });
    });
});

//show Login form
router.get("/login",function(req, res) {
    res.render("login");
})

//handling login logic
router.post("/login",passport.authenticate("local",{
     successRedirect:"/campgrounds",
     failureRedirect:"/login"
}),function(req,res){});

//logout route
router.get("/logout",function(req, res) {
    req.logout();
    res.redirect("/campgrounds");
})

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        res.redirect("/login");
    }
}

module.exports = router;