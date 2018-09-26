var mongoose    = require("mongoose");


var commentSchema = mongoose.Schema({
    title:String,
    author:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username:String
    }
});



module.exports  = mongoose.model("Comment",commentSchema);