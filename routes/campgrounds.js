var express       = require("express");
var router        = express.Router();
var Campground    = require("../models/campground.js");
var middleware    = require("../middleware");



//Index route: show all campgrouds
router.get("/",function(req,res){
    Campground.find({},function(err,campgrounds){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/index",{campgrounds:campgrounds, currentUser:req.user});
        }
    })
    
})

//create campgrounds
router.post("/",middleware.isLoggedIn,function(req,res){
            var name = req.body.name;
            var image = req.body.image;
            var description = req.body.description;
            var author   = {
                id:req.user._id,
                username:req.user.username
            };
            console.log(author);
            var campground = {name,image,description,author};
    
    Campground.create(campground,function(err,newCampground){
            if(err){
                console.log(err);
            }
            else{
                console.log(newCampground);
                res.redirect("/campgrounds");
            }
            })
    
        })
        

//new route
router.get("/new",middleware.isLoggedIn,function(req, res) {
    res.render("campgrounds/new");
})

//SHOW Route

router.get("/:id",function(req,res){
   
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err){
            console.log(err);
        }
        else{
             res.render("campgrounds/show",{campground:foundCampground,currentUser:req.user});
             
        }
    })
   
})
//Edit Route
router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req, res) {
    Campground.findById(req.params.id,function(err,foundCampground){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/edit.ejs",{campground:foundCampground});
        }
    })
    
})

//Update Route
router.put("/:id",middleware.checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
})

//DESTROY route

router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndRemove(req.params.id,function(err,deletedCampground){
        if(err){
            res.redirect("/campgrounds")
        }
        else{
            res.redirect("/campgrounds")
        }
    })
})



module.exports   = router;