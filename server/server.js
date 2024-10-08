require('dotenv').config();
const express=require('express');
const mongoose=require("mongoose");
//const bodyParser=require("body-parser");
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const MongoStore=require('connect-mongo');
const cors = require('cors');
const path=require('path');
const port=process.env.PORT || 5000;
const app=express();
//db connection file
const connectDB=require('./utils/db');
const router=require('./routes/auth_route');
const menuRouter=require('./routes/menu_route');
const cartRouter=require('./routes/cart_route');
// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cors configuration
app.use(cors({
    origin: 'http://localhost:5173', // React app domain
    credentials: true, // Allow cookies to be sent
  }));

  //express session


//session config & session store

console.log(process.env.MONGODB_CONNECTION_URL);
// app.use(session({
//     secret:process.env.COOKIE_SECRET,
//     resave: false,
//     saveUninitialized: true,
//     store: MongoStore.create({
//         mongoUrl:process.env.MONGODB_CONNECTION_URL,
//         collectionName: 'sessions',
//         ttl: 14 * 24 * 60 * 60, 
//         autoRemove: 'native'   
//     }),
//     cookie: { maxAge: 1000 * 60 * 60 * 24},
//     // httpOnly: true, // Mitigate XSS
//     // secure: true, // Uncomment if using HTTPS
// }));
//session config & session store
app.use(session({
    secret:process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl:process.env.MONGODB_CONNECTION_URL,
        collectionName: 'sessions',
        ttl: 14 * 24 * 60 * 60, 
        autoRemove: 'native'   
    }),
    cookie: { maxAge: 1000 * 60 * 60 * 24}
}));


//passport config file
const passportInit=require('./utils/passportConfig')
passportInit(passport);

//initialize passport and session
app.use(passport.initialize());
app.use(passport.session());

//for flash msgs
app.use(flash());


const flashMiddleware = (req, res, next) => {
    res.locals.flash = req.flash();
    next();
};
// Apply middleware globally
app.use(flashMiddleware);
// Global variables for flash messages (optional)
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  });
  

//set assets
app.use(express.static('public'));


//global middleware
app.use((req, res, next) => {
    res.locals.session = req.session;
    res.locals.user = req.user;
    next();
  })

//routers
app.use("/api/auth", router);
app.use("/api",menuRouter);
app.use('/images', express.static(path.join(__dirname, '../client/public/images')));
app.use('/api/',cartRouter)

//connectDB().then(()=>{
    app.listen(port,()=>{
        console.log(`listening to the port ${port}`);
    });
//});