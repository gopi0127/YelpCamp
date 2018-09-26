var express     = require("express");
var router      = express.Router({mergeParams:true});
var Campground  = require("../models/campground.js");
var Comment     = require("../models/comment.js");
var middleware  = require("../middleware");

//comments new
router.get("/new",middleware.isLoggedIn,function(req,res){
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
        }
        else{
            res.render("comments/new",{campground:campground});
        }
    })
})
    
//comments create
router.post("/",middleware.isLoggedIn,function(req,res){
        var comment = req.body.comment;
        Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
            if(err){
                console.log(err);
            }
            else{
                
                Comment.create(comment,function(err,newComment){
                    if(err){
                        console.log(err)
                    }
                    else{
                        newComment.author.username = req.user.username;
                        newComment.author.id       = req.user._id;
                        newComment.save();
                        foundCampground.comments.push(newComment);
                        foundCampground.save();
                        res.redirect("/campgrounds/"+req.params.id);
                    }
                })
            }
        })
})

//comments edit

router.get("/:comment_id/edit",middleware.checkCommentAuthorization,function(req,res){
    
    Comment.findById(req.params.comment_id,function(err,foundComment){
        if(err){
            res.render("/campgrounds/show")
        }
        else{
            res.render("comments/edit",{comment:foundComment,campground_id:req.params.id});
        }
    })
    
})

//comments update
router.put("/:comment_id",middleware.checkCommentAuthorization,function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
        if(err){
            res.redirect("campgrounds/"+req.params.id);
        }
        else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
})

//comments delete
router.delete("/:comment_id",middleware.checkCommentAuthorization,function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id,function(err,deletedComment){
        if(err){
            res.redirect("/campgrounds/"+req.params.id);
        }
        else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
})



module.exports = router;