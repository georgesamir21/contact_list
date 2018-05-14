const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser').json(); //.urlencoded();
const validator = require('validator');

const mobileRegex = /^(\+201|01)[0-9]{9}/;

const ContactsModel = require('../models/contacts'); 
const UsersModel = require('../models/users');

let router = express.Router();

let userId;

const authMid = (request, response, next)=>{   
    UsersModel.findUserByFingerPrint(request.body.fingerPrint, (err, result)=>{
        if(!err && result && request.body.authorization === result.get('authorization') && request.body.deviceToken === result.get('deviceToken')){
            userId = result.get('_id');
            next();
        } else {
            let message = {
                success: false,
                error: 'unauthorized'
            }            
            response.json(message);
        }
    });
}

const inputValidation = (request, response, next)=>{
    let emailValid = false;
    let mobileValid = false;
    let firstNameVaild = false;
    let lastNameValid = false;
    let errorMsg = {};

    if(validator.isEmail(request.body.email)){
        emailValid = true;
    } else {
        errorMsg.email = 'Inavlid email input';
    }

    if(typeof request.body.mobile === "string" && request.body.mobile.match(mobileRegex)){
        mobileValid = true;
    } else {
        errorMsg.mobile = 'Inavlid mobile number input';
    }

    if(typeof request.body.firstName === "string"){
        firstNameVaild = true;
    } else {
        errorMsg.firstName = 'Invalid first name input';
    }

    if(typeof request.body.lastName === "string"){
        lastNameValid = true;
    } else {
        errorMsg.lastName = 'Invalid last name input';   
    }

    if(emailValid && mobileValid && firstNameVaild && lastNameValid) {
        next();
    } else {
        let message = {
            success: false,
            error: errorMsg
        }
        response.json(message);
    }
}

router.post('/addContact',bodyParser, authMid, inputValidation,(request, response)=>{
    let contactData = {
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        email: request.body.email,
        mobile: request.body.mobile,
        userId: userId
    };

    ContactsModel.addNewContact(contactData, (err, result)=>{
        if(!err) {
            let message = {
                statusCode: response.statusCode,
                success: true,                
                message: 'Contact added!',
                data: result
            }
            response.json(message);
        } else {

            response.json('Error saving your contact');
        }
    });
});

router.post('/getList',bodyParser, authMid,(request, response)=>{
    ContactsModel.findUserContacts(userId, request.body.pageNo, (err, result)=>{
        if(!err){
            let message = {
                statusCode: response.statusCode,
                success: true,                
                message: 'Conatcts list',
                data: result
            }
            response.json(message); 
        } else {
            let message = {
                success: false,
                error: 'Error getting your contacts'
            }
            response.json(message);
        }
    });
});

router.post('/getRecentList',bodyParser, authMid, (request, response)=>{
    ContactsModel.findRecentContacts(userId, (err, result)=>{
        if(!err){
            let message = {
                statusCode: response.statusCode,
                success: true,
                message: 'Recent List',
                data: result
            }
            response.json(message);
        } else {
            let message = {
                success: false,
                error: 'Error getting your contacts'
            }
            response.json(message); 
        }
    });
});

module.exports = router;