const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        trim: true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique: [true, 'email already exists'],
        validate: {
            validator: function (value) {
              return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: 'Invalid email address format',
          },
          
    },
    password:{
        type:String,
        required:true
    }, 
    role:{
        type:String,
        required:true,
        default:'customer',
    }
    
},{timestamps:true});

const User=new mongoose.model('User',UserSchema);

module.exports=User;