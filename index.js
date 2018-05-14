const express = require('express');
const mongoose = require('mongoose');
const path = require('path')

mongoose.connect("mongodb://localhost/contactListVapulus");

const server = express();

const contactsRouter = require(path.join(__dirname, 'controllers', 'contacts'));

server.use('/contacts', contactsRouter);

server.listen(9090, ()=>{
    console.log("server is working on localhost:9090");
});
/*
//to add two users to the database...
//UNCOMMENT the below code to insert two users at the database then delete the code..
const UsersModel = require('./models/users');
let userA = {
    _id: 1,
    "authorization" : "ff34555392bcd3f268f74d29daf1f819336616f115a38f73318354b374763b05079c0ab18f68",
    "deviceToken" : "0b0c968654b27e0701ad2bf5772d1cdcffe8e149cd6506e3ffd35c8e36cbcfe64116e47a217ae6b1f8cb908e067ae108c14f0077424712195aebf39c8cb747b7811891e201e",
    "fingerPrint" : "123456789",
    "name": "User A"
}
let userB = {
    _id: 2,
    "authorization" : "ff34555392bcd3f268f74d29daf1f78pi36616f115a38f73318354b374763b05079c0ab18f68",
    "deviceToken" : "0b0c968654b27e0701ad2bf5772d18f63fe8e149cd6506e3ffd35c8e36cbcfe64116e47a217ae6b1f8cb908e067ae108c14f0077424712195aebf39c8cb747b7811891e201e",
    "fingerPrint" : "987654321",
    "name": "User B"
}

UsersModel.addUser(userA, (err, result)=>{
    if(!err){
        console.log('added userA');
        
    }
});
UsersModel.addUser(userB, (err, result)=>{
    if(!err){
        console.log('added userB');
        
    }
});
*/