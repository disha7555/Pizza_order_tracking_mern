const LocalStrategy=require('passport-local').Strategy;
const bcrypt=require('bcryptjs');
const User=require('../models/User');


function init(passport){
    passport.use(new LocalStrategy({usernameField:'email'},async(email,password,done)=>{
        try{
        //verify if email exists
        const user=await User.findOne({email:email});
        if(!user){
            return done(null,false,{message:'incorrect email or passowrd'});
        }
        //password matching
        const isMatch= await bcrypt.compare(password,user.password);
        if(isMatch){
            return done(null,user);
        }else{
            return done(null,false,{message:'incorrect email or passowrd'});
        }
    }
        catch (err) {
            return done(err);
          }
    }));
    //managing sessions
    //serialize User to store in session 

    passport.serializeUser((user,done)=>{
        done(null,user._id);
    })

    //deserialize user from session
    passport.deserializeUser(async (id, done) => {
        try {
          const user = await User.findById(id).select('-password'); // Exclude password
          done(null, user);
        } catch (err) {
          done(err, null);
        }
      });
    };

module.exports=init;