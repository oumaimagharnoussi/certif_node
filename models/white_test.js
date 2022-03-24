const mongoose = require('mongoose');
const Joi = require('joi');
const {date} = require("joi");

const white_test_schema = new mongoose.Schema({

    dispo:Boolean,
    date :{type:[Date]},
    certification : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : 'certification'
        }
    ]
});

let validation_white_test = Joi.object({


    dispo: Joi.bool().required(),
    date : Joi.array().items(Joi.date())
});

let validation_update_white_test = Joi.object({


    dispo: Joi.bool().required(),
    date : Joi.array().items(Joi.date())
});

let White_test = mongoose.model('White_test',white_test_schema);

module.exports.White_test = White_test;
module.exports.validation_white_test = validation_white_test;
module.exports.validation_update_white_test = validation_update_white_test;