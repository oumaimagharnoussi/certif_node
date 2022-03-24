const mongoose = require('mongoose');
const Joi = require('joi');
const {boolean} = require("joi");

const certification_schema = new mongoose.Schema({
    name : {
        type : String,
        require : true,
    },

    dispo:{
        type:Boolean,
        require : true,
    },


    white_tests : {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'White_test'
        }
    }
});

let validation_certification = Joi.object({
    name : Joi.string().min(3).required(),
    dispo: Joi.bool().required()

});

let validation_update_certification = Joi.object({
    name : Joi.string().min(3).required(),
    dispo: Joi.bool().required()
});

let Certification = mongoose.model('Certification',certification_schema);

module.exports.Certification = Certification;
module.exports.validation_certification = validation_certification;
module.exports.validation_update_certification = validation_update_certification;