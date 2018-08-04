var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var watchesSchema= new Schema({
    name: {
        type:String,
        required:true
    },
    price: {
        type: Number,
        required:true
    },

    imgLink:
        {
            type:String,
            required:true
        },
    description:
        {
            type:String,
            required:false

        },

    sub_category:
{
    type: String,
        required:true
}



})

module.exports=mongoose.model('watchesSchema',watchesSchema)