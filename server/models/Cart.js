const mongoose=require('mongoose');

const CartItemSchema=new mongoose.Schema({
    itemId: {  // Reference to the Menu Item
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Menu',
        required: true
    },
    itemName:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true
    },
    size:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true,

    },
    quantity:{
        type:Number,
        required:true,
        default:0
    }
});

const CartSchema=new mongoose.Schema({
    items:[CartItemSchema],  // Array of cart items
    totalQuantity:{
        type:Number,
        required:true,
        default:0
    },
    totalPrice:{
        type:Number,
        required:true,
        default:0
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }

});

CartSchema.pre('save',function(next){

let totalPrice=0;
let totalQuantity=0;

this.items.forEach(item=>{
    totalQuantity=totalQuantity + item.quantity;
    totalPrice= totalPrice + (item.quantity * item.price);
});

this.totalPrice=totalPrice;
this.totalQuantity=totalQuantity;

next();
});


const Cart = new mongoose.model('Cart',CartSchema);
module.exports=Cart;