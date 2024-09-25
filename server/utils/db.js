const mongoose=require('mongoose');
const url=process.env.MONGODB_CONNECTION_URL;
// mongoose.connect().then(()=>{
//     console.log("connected to database");
// }).catch((err)=>{
//     console.log("could not connect to databse");
//     console.error(err.message);
//     process.exit(1);
// });

const connectDB = async () => {
  try {
    await mongoose.connect(url, { // Replace with your MongoDB URI
      
    //   useCreateIndex: true, // To fix deprecation warnings
    });
    console.log('MongoDB Connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
