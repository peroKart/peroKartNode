var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var sellorSchema= new Schema({
    username: {
        type:String,
        required:true
    },
    password:
        {
            type:String,
            required:true
        },
    name:
        {
            type:String,
            required:true
        },
    itemsOnSale:
        {
            type:Array
        },
    phoneNumber:{
        type:Number,
        required:true
    }


});
sellorSchema.index({username:1}, {unique:true});
module.exports=mongoose.model('sellorSchema',sellorSchema);