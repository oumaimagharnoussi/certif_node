const router = require('express').Router();
const {Certification, certification_validation, certification_validation_update} = require('../models/certification');
const {White_test} = require('../models/white_test');
const auth = require('../middlewares/auth');
const autoris = require('../middlewares/autoris');

router.post('',[auth,autoris],async (req,res)=>{
    try {
        let result_valid= certification_validation.validate(req.body);
        if(result_valid.error)
            return res.status(400).send(result_valid.error.details[0].message);
        let white_test = await White_test.findById(req.body.white_test);
        if(! white_test )
            return res.status(400).send('White_test Id does not exist');

        let certification = new Certification(req.body);
        certification.white_test.name = white_test.name;
        certification.white_test.id = white_test._id;
        certification =  await certification.save();
        white_test.certifications.push(certification._id);
        await white_test.save();
        res.status(201).send(certification);
    } catch (error) {
        res.status(400).send('Problem saving Certification : '+error.message)
    }

});

// get all certifications
router.get('',async (req,res)=>{
    //let certifications = await Certification.find({},'title white_test isPublished -_id');
    let certifications = await Certification.find().populate('white_test.id');
    res.send(certifications);
});

// update
router.put('/:id', [auth,autoris],async (req,res)=> {
    // new data is validated
    let result_valid= certification_validation_update.validate(req.body);
    if(result_valid.error)
        return res.status(400).send(result_valid.error.details[0].message);

    //update content
    await Certification.updateOne({_id: req.params.id},req.body);
    res.send(await Certification.findById(req.params.id));
});

// delete
router.delete('/:id',[auth,autoris], async (req,res)=> {
    let certification = await Certification.findByIdAndRemove(req.params.id);
    if(! certification )
        return res.status(404).send('Certification id is not found');
    res.send(certification);
});

module.exports=router;