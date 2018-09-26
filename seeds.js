var mongoose          = require("mongoose");
var Campground        = require("./models/campground.js");
var Comment           = require("./models/comment.js");

var data     = [
    {name:"Gopikrishna",
    image:"https://images.unsplash.com/photo-1530883154101-ce08df5ec9be?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2880db98bbecff8d683e246db597361e&auto=format&fit=crop&w=1950&q=80",
    description:"industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently "    
    },
    {
    name:"Mayuri",
    image:"https://images.unsplash.com/photo-1530832963845-cd3dcb1c801d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ba9d5847e1efb3cabfb3e0f4efc197de&auto=format&fit=crop&w=1950&q=80",
    description:"industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently "    
    },
    {
    name:"Prasanth",
    image:"https://images.unsplash.com/photo-1530831020276-36d070e73086?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=af8b00c41c569d79506038e0c0820bb4&auto=format&fit=crop&w=1935&q=80",
    description:"industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently "    
    }]
    
function seedDB(){
    
    Campground.remove({},function(err){
    // if(err){
    //     console.log(err)
    // }
    // else{
    // console.log("removed campgrounds");
    // data.forEach(function(seed){
    // Campground.create(seed,function(err,campground){
    //     if(err){
    //         console.log(err);
    //     }
    //     else{
    //         console.log("campground created.!");
    //         Comment.create({
    //             title:"This is my comment",
    //             author:"Iam the author"
    //         },function(err,comment){
    //             if(err){
    //                 console.log(err);
    //             }
    //             else{
    //                 campground.comments.push(comment);
    //                 campground.save();
    //                 console.log("The comment has been created");
    //             }
                
    //         });
            
            
    //     }
    // })
    // })}
    });
}

module.exports = seedDB;