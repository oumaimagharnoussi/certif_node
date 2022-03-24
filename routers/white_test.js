const router = require('express').Router();
const {White_test, white_test_validation, white_test_validation_update} = require('../models/white_test');
const {Certification} = require('../models/certification');
const auth = require('../middlewares/auth');
const autoris = require('../middlewares/autoris');

router.post('',[auth,autoris],async (req,res)=>{
    try {
        let result_valid= white_test_validation.validate(req.body);
        if(result_valid.error)
            return res.status(400).send(result_valid.error.details[0].message);
        let certification = await Certification.findById(req.body.certification);
        if(! certification )
            return res.status(400).send('Certification Id does not exist');

        let white_test = new White_test(req.body);
        white_test.certification.name = certification.name;
        white_test.certification.id = certification._id;
        white_test =  await white_test.save();
        certification.white_tests.push(white_test._id);
        await certification.save();
        res.status(201).send(white_test);
    } catch (error) {
        res.status(400).send('Problem saving White_test : '+error.message)
    }

});

// get all white_tests
router.get('',async (req,res)=>{
    //let white_tests = await White_test.find({},'title certification isPublished -_id');
    let white_tests = await White_test.find().populate('certification.id');
    res.send(white_tests);
});

// update
router.put('/:id', [auth,autoris],async (req,res)=> {
    // new data is validated
    let result_valid= white_test_validation_update.validate(req.body);
    if(result_valid.error)
        return res.status(400).send(result_valid.error.details[0].message);

    //update content
    await White_test.updateOne({_id: req.params.id},req.body);
    res.send(await White_test.findById(req.params.id));
});

// delete
router.delete('/:id',[auth,autoris], async (req,res)=> {
    let white_test = await White_test.findByIdAndRemove(req.params.id);
    if(! white_test )
        return res.status(404).send('White_test id is not found');
    res.send(white_test);
});

module.exports=router;