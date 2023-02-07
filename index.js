//Import Express module
const express = require('express');
//Import Json Web Token module
const Jwt = require('jsonwebtoken');
const app = express();
const port = 3000;

//Get request to test the application
app.get('/api', (req, res) => {
    res.json( {
        message: "API Service!"
    });
});

//Post request to verify the JWT token first and then return the Details of User
app.post('/api/posts', verifyToken , (req, res) => {
    Jwt.verify(req.token, 'secretkey', (error, authData) => {
        if(error){
            res.sendStatus(403);
        }else{
            res.json({ 
                message: 'Posts Created!',
                authData, 
            });
        }
    });
});

//Post request for login
app.post('/api/login', (req, res) => {
    //A Demo User
    const newUser = {
        id:1,
        username: 'Zia',
        email:'softeng.ziaulhaq@gmail.com',
    };
    //JWT sign function which return the token
    Jwt.sign(
        { user: newUser }, "secretkey", (error, token) => {
            res.json({
                token,
            });
        });
});

//Verify the JWT Token created
function verifyToken(req, res, next){
     const bearerHeader = req.headers['authorization'];
     if(typeof bearerHeader !== 'undefined'){
        const bearerToken = bearerHeader.split(' ')[1];
        req.token = bearerToken;
        next();
     } else {
        res.sendStatus(403);
     }
}

//Server running on the port:3000
app.listen( port, 'localhost', (req, res) => { 
    console.log("Server is running on Port:" + port); 
});