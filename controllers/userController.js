
const { readFileSync, writeFileSync } = require('fs');
const path = require('path');
const sendMail = require('../utility/sendMail');
const sendSms = require('../utility/sendSms');



// HomePage Controller.
const showHomePage = (req, res) => {

    const allStudentData = JSON.parse(readFileSync(path.join(__dirname, '../db/student.json')));
    
    res.render('users/index', {
        allStudentData
    });
    
};




// Create UserData Controller.
const userDataCreate = (req, res) => {

    // Get AllData.
    const allStudentData = JSON.parse(readFileSync(path.join(__dirname, '../db/student.json')));
    const { name, email, cell, photo } = req.body;

    // Get-ID.
    let last_id = 1;
    if(allStudentData.length > 0){
        last_id = allStudentData[allStudentData.length - 1].id + 1;
    };


    console.log(req.files);

    // Add NewData.
    allStudentData.push({
        id : last_id,
        name : name,
        email : email,
        cell : cell,
        photo : req.files.user_photo_upload[0].filename,

    });

    // Now StoreData to db.
    writeFileSync(path.join(__dirname, '../db/student.json'), JSON.stringify(allStudentData));


    sendMail(req.body.name, req.body.email, 'Account-Varification' );
    sendSms( req.body.cell, `Hi ${req.body.name}, you are wellcome to our community. please check your email ${req.body.email} for account activation. Thanks to with us.` );



    res.redirect('/user');

};







// Exports Controllers.
module.exports = {
    showHomePage,
    userDataCreate,
};