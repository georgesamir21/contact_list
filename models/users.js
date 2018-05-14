const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let users = new Schema({
    _id: {
        type: Number,
    },
    name: {
        type: String,
    },
    authorization: {
        type: String,
    },
    fingerPrint: {
        type: String,
    },
    deviceToken: {
        type: String
    }
});

mongoose.model('users', users);

UsersModel = {};

UsersModel.model = mongoose.model('users');

UsersModel.findUserByFingerPrint = (fingerPrint, callbackFn)=>{
    UsersModel.model.findOne({fingerPrint: fingerPrint},(err, result)=>{
        callbackFn(err, result);
    });
}

UsersModel.addUser = (userData, callbackFn)=>{
    let user = new UsersModel.model(userData)
    user.save((err, result)=>{
        callbackFn(err, result);
    });
}

module.exports = UsersModel;