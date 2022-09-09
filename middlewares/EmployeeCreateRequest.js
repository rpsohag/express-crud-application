const multer = require('multer');
const path = require('path');


const UPLOAD_LOCATION = path.join(__dirname,'./../public/images/employees');

const storage = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null, UPLOAD_LOCATION);
    },
    filename: (req,file,cb) => {
        const fileExt = path.extname(file.originalname);
        const fileName = file.originalname.replace(fileExt, "").toLowerCase().split(" ").join("-") + "-" + Date.now();
        cb (null, fileName+fileExt)
    }
})

const EmployeeDataStore = multer({
    storage : storage,
    limits: {
        fileSize : 1000000
    },
    fileFilter : (req,file,cb) => {
        if(file.fieldname == 'photo'){
            if(file.mimetype == 'image/jpg' || file.mimetype == 'image/png' || file.mimetype == 'image/jpeg'){
                cb(null, true)
            }else{
                cb(new Error('Only .jpg .png .jpeg format are allowed!'))
            }
        }else{
            cb('Something Went wrong');
        }
    }
}).single('photo');






module.exports = {
    EmployeeDataStore
}