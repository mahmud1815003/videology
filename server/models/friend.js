// Job Guru Server
// Developed by Jaied Bin Mahmud
// KUET BME '18

//External Imports
const mongoose = require('mongoose');


//Schema 

const friendSchema = mongoose.Schema({
    friend1: String,
    friend2: String
});


//Model

const friendModel = mongoose.model('Friends', friendSchema);


module.exports = {
    friendModel,
}