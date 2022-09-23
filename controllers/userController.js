
const { readFileSync, writeFileSync } = require('fs');
const path = require('path');
const sendMail = require('../utility/sendMail');
const sendSMS = require('../utility/sendSMS');



// HomePage Controller.
const showHomePage = (req, res) => {

    const allStudentData = JSON.parse(readFileSync(path.join(__dirname, '../db/student.json')));
    
    res.render('users/index', {
        allStudentData
    });
    
};




// Create UserData Controller.
const userDataCreate = async (req, res) => {

    // Get AllData.
    const allStudentData = JSON.parse(readFileSync(path.join(__dirname, '../db/student.json')));
    const { name, email, cell, photo } = req.body;

    // Get-ID.
    let last_id = 1;
    if(allStudentData.length > 0){
        last_id = allStudentData[allStudentData.length - 1].id + 1;
    };


    // Add NewData.
    allStudentData.push({
        id : last_id,
        name : name,
        email : email,
        cell : cell,
        photo : req.files.user_photo_upload[0].filename

    });

    await sendMail(req.body.name, req.body.email, 'Account-Varification' );
    await sendSMS( req.body.cell, `Hi ${req.body.name}, you are wellcome to our community. please check your email ${req.body.email} for account activation. Thanks to with us.` );

    // Now StoreData to db.
    writeFileSync(path.join(__dirname, '../db/student.json'), JSON.stringify(allStudentData));

    res.redirect('/user');

};


// Single View Controller.
const showSingleView = (req, res) => {

    const allStudentData = JSON.parse(readFileSync(path.join(__dirname, '../db/student.json')));
    
    // Get id
    const { id } = req.params;
    const singleStudent = allStudentData.find( data => data.id == id);

    res.render('users/single', {
        singleStudent
    })
};


// EditData Controller.
const showEditForm = (req, res) => {

    const allStudentData = JSON.parse(readFileSync(path.join(__dirname, '../db/student.json')));
    
    // Get id
    const { id } = req.params;
    const singleStudent = allStudentData.find( data => data.id == id);

    res.render('users/edit', {
        singleStudent
    });
}



// UpdateUserData Controller.
const updateUserData = (req, res) => {

    // Get AllDate.
    const allStudentData = JSON.parse(readFileSync(path.join(__dirname, '../db/student.json')));
    
    // Get id
    const { id } = req.params;

    // Get Index for json db.
    const index = allStudentData.findIndex( data => data.id == id );


    // updateData
    allStudentData[index] = {
        ...allStudentData[index],
        name : req.body.name,
        email : req.body.email,
        cell : req.body.cell,
    };

    // Now Restore NewData to Json db.
    writeFileSync(path.join(__dirname, '../db/student.json'), JSON.stringify(allStudentData));

    // Now Back to allStudentDataTable.
    res.redirect('/user');
};



// DeleteUserData Controller.
const deleteUserData = (req, res) => {

    // Get AllDate.
    const allStudentData = JSON.parse(readFileSync(path.join(__dirname, '../db/student.json')));
    
    // Get id
    const { id } = req.params;

    // DataFilter to JSON db.
    const newData = allStudentData.filter( data => data.id != id );

    // Now NewData NewData add to JSON db without deleteData.
    writeFileSync(path.join(__dirname, '../db/student.json'), JSON.stringify(newData));

    // Now Back to AllDataTable.
    res.redirect('/user');
};







// Exports Controllers.
module.exports = {
    showHomePage,
    userDataCreate,
    showSingleView,
    showEditForm,
    updateUserData,
    deleteUserData,
};