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
    passowrd:{
        type:String,
        required:true
    }, 
    
},{timestamps:true});

const User=new mongoose.model('User',UserSchema);

module.exports=User;