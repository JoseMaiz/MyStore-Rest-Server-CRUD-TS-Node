import mongoose, { Schema } from "mongoose";


const productSchema = new mongoose.Schema({

    name:{
        type:String,
        required: [true, 'Name is required'],
        unique:true,
    },
    available:{
        type:Boolean,
        default: false,
    },
    price:{
        type:Number,
        default: 0
    },
    description:{
        type:String
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required: true,
    },
    category: {
        type:Schema.Types.ObjectId,
        ref:'Category',
        required: true,
    }
});

//*This is the form for active o deactivate elements of the Schema model 
productSchema.set('toJSON',{
    virtuals: true, //*Active normal ID without 
    versionKey:false,//*Deactivate the "_V"
    transform: function(doc, ret, options) {
        delete ret._id;
    },
})

export const ProductModel = mongoose.model('Product',productSchema)