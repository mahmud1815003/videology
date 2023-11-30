// Videology Server
// Developed by Jaied Bin Mahmud
// KUET BME '18

//External Imports
const mongoose = require('mongoose');


//Schema 

const peopleSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    verified: Boolean,
    code: String,
});


//Model

const peopleModel = mongoose.model('Peoples', peopleSchema);


module.exports = {
    peopleModel,
}