let mongoose = require('mongoose');

let roleSchema = mongoose.Schema({
    roleName:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        default:""
    }
},{
    timestamps:true
})
<<<<<<< HEAD
module.exports =  mongoose.model('role',roleSchema )
   
=======
module.exports =  mongoose.model('role',roleSchema)
>>>>>>> 48d098df68c7c943470ec4fab3e8c639c2fd98d7
