const express = require('express');
const multer = require('multer');
const path = require('path');
const { showHomePage, userDataCreate, showSingleView, showEditForm, updateUserData, deleteUserData } = require('../controllers/userController');



// Init UserPhotoMulter.
const storage = multer.diskStorage({

    destination : ( req, file, cb ) => {
        if(req.files.user_photo_upload){
            if( file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpg' || file.mimetype == 'image/png' ){
                cb( null, path.join(__dirname, '../public/images/userPhoto/'));
            }else{
                console.log(`Invalid Photo format`);
            }
        };

        if(req.files.cv){
            if( file.mimetype == 'application/pdf' ){
                cb( null, path.join(__dirname, '../public/files/cv/'));
            }else{
                console.log(`Invalid CV format`);
            }
        };
    }, 
    filename : ( req, file, cb ) => {
        cb( null, Date.now() + '_' + Math.floor(Math.random() * 1000000) + '_' + file.originalname);
    }
});



const UserPhotoMulter = multer({
    storage : storage,
}).fields([
    {
        name : "user_photo_upload",
        maxCount : 3
    },
    {
        name : "cv",
        maxCount : 1
    }
]);



// Init Router.
const router = express.Router();



// Routes.
router.get('/', showHomePage);
router.post('/', UserPhotoMulter, userDataCreate);
router.get('/single/:id', showSingleView);
router.get('/edit/:id', showEditForm);
router.post('/update/:id', UserPhotoMulter, updateUserData);
router.get('/delete/:id', deleteUserData);




// Exports Router.
module.exports = router;