const router = require('express').Router();
const {Certification, certification_validation, certification_validation_update} = require('../models/certification');
const {White_test} = require('../models/white_test');
const auth = require('../middlewares/auth');
const authorisCandidats = require('../middlewares/authorisCandidats');

router.get('/certification/:name',[auth,authorisCandidats],async (req,res)=>{
    //let certifications = await Certification.find({},'title white_test isPublished -_id');
    let white_tests = await Certification.find({name:req.params.name,"white_test.dispo":true}).populate('white_test.id');
    res.send(white_tests);
});

router.get('/white_test/:id',[auth,authorisCandidats],async (req,res)=>{
    //let certifications = await Certification.find({},'title white_test isPublished -_id');
    let white_tests = await White_test.findById(req.params.id);

    if(white_tests){

        res.send("choix validé");
    }else{
        res.send("error du validation du choix")
    }
});


module.exports=router;