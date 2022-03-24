function isCandidat(req,res,next) {
    if(req.user.role != 'candidat')
        return res.status(401).send('You must be candidat to do this');
    next();
}
module.exports=isCandidat;