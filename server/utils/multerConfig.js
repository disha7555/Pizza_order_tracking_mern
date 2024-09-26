const multer=require("multer");
const path=require("path");

//multer configuration disk storage and file path
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname,'../../client/public/images'));
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    }
})

//file filter to accept only certain file types
const fileFilter=(req,file,cb)=>{
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPEG, PNG are allowed!'), false);
    }
}

//export configured multer

const upload=multer({
    storage:storage,
    fileFilter:fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 } // 5MB limit
});

module.exports=upload;