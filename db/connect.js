const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://user:1234@cluster0.huusc.mongodb.net/db?retryWrites=true&w=majority')
    .then(()=>console.log('MongoDB is up.'))
    .catch((err)=>console.log('MongoDB is Down, raison :',err.message));

