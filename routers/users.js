const router = require('express').Router();
const {User, validation_user,validation_user_login} = require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/signup', async (req,res)=>{
    let result_valid= validation_user.validate(req.body);
    if(result_valid.error)
        return res.status(400).send(result_valid.error.details[0].message);
    try{
        let salt = await bcrypt.genSalt(10);
        //console.log('salt :', salt);
        let user = new User(req.body);
        user.password = await bcrypt.hash(user.password, salt);
        //console.log('pass : ', user.password);
        await user.save();
        res.status(201).send('Registration Success!!')
    }catch(err){
        res.status(400).send('Error in registration : '+err.message)
    }

});

router.post('/signin', async (req,res)=>{
    let result_valid= validation_user_login.validate(req.body);
    if(result_valid.error)
        return res.status(400).send(result_valid.error.details[0].message);
    try{
        let user = await User.findOne({email : req.body.username});
        if( ! user )
            return res.status(400).send('Username or password is incorrect');
        let bool = await bcrypt.compare(req.body.password, user.password);
        if(!bool)
            return res.status(400).send('Username or password is incorrect');
        let token = jwt.sign({id: user._id, name: user.name, role: user.role}, 'jwtSecret',{expiresIn:'1h'});
        res.header('x-access-token',token).send('Login Success !!!');
    }catch(err){
        res.status(400).send('Error in registration : '+err.message)
    }

});



module.exports=router