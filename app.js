var express                = require("express"),
    app                    = express(),
    User                   = require("./models/user"),
    bodyParser             = require("body-parser"),
    mongoose               = require("mongoose"),
    passport               = require("passport"),
    methodOverride         = require("method-override"),
    Campground             = require("./models/campground.js"),
    Comment                = require("./models/comment.js"),
    seedDB                 = require("./seeds"),
    localStrategy          = require("passport-local"),
    passportLocalMongoose  = require("passport-local-mongoose");
    
//requiring routes
var commentRoutes          = require("./routes/comments.js"),
    campgroundRoutes       = require("./routes/campgrounds.js"),
    indexRoutes            = require("./routes/index.js");
    

// seedDB();  

var url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp" 

mongoose.connect(url);


app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));



//=======================
//Passport Configuration
//=======================

app.use(require("express-session")({
    secret:"my first web application",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
}); 

app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use(indexRoutes);



app.listen(process.env.PORT,process.env.IP,function(){
    console.log("YELPCAMP SERVER HAS STARTED");
})