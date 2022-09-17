
const dotenv = require('dotenv').config();
const twilio = require('twilio')(process.env.SID, process.env.AUTH_TOKEN);

const twilio_cell = process.env.TWILIO_CELL;


// Create SMS.
const sendSms = ( to, sms ) => {

   twilio.messages.create({
    from : twilio_cell,
    to : to,
    body : sms,
   })
   .then(res => {
    console.log(`sms send`);
   })
   .catch(error => {
    console.log(error.messages);
   })

};


// Exports Twilio.
module.exports = sendSms;