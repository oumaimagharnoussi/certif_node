require('./db/connect');
const express = require('express');
const certification_router= require('./routers/certification')
const white_test_router= require('./routers/white_test')
const choix_router= require('./routers/choix')
const user_router= require('./routers/users');
const auth = require('./middlewares/auth')
const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());

app.get('/', (req,res)=>{
    res.send('<h1> Welcome to our RestAPI </h1>');
});
app.use('/api/certification',certification_router);
app.use('/api/white_test',white_test_router);
app.use('/api/users',user_router);
app.use('/api/choix',choix_router);

app.listen(port, () =>  console.log(`Server running on ${port}`));