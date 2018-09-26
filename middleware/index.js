var Campground  = require("../models/campground.js");
var Comment  = require("../models/comment.js");

var middleware  = {};

middleware.checkCampgroundOwnership = function(req,res,next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id,function(err, foundCampground) {
            if(err){
                res.redirect("back");
            }
            else{
                if(foundCampground.author.id.equals(req.user._id)){
                      next();
                }
                else{
                    res.redirect("back");
                }
            }
        })
    }
    else{
        res.redirect("back");
    }
}

//Comment Authorization

middleware.checkCommentAuthorization  = function (req,res,next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id,function(err, foundComment) {
            if(err){
                res.redirect("back");
            }
            else{
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    res.redirect("back");
                }
            }
        })
    }
    else{
        res.redirect("back");
    }
}

//Check login

middleware.isLoggedIn  = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        res.redirect("/login");
    }
}



module.exports   = middleware;