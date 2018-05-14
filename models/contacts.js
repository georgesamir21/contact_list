const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
mongoose.plugin(mongoosePaginate);

const Schema = mongoose.Schema;

let contacts = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
        
    },
    email: {
        type: String,
        required: true,        
    },
    mobile: {
        type: String,
        required: true,
    },
    userId: {
        type: Number,
        ref: "users"
    },
    dateCreated: {
        type: Date,
        default: new Date()
    }
});

mongoose.model('contacts', contacts);

let ContactsModel = {};

ContactsModel.model = mongoose.model('contacts');

ContactsModel.addNewContact = (contactData, callbackFn)=>{
    let contact = new ContactsModel.model(contactData);
    contact.save((err, doc)=>{
        callbackFn(err, doc);
    });
}

ContactsModel.findUserContacts = (userId, pageNo, callbackFn)=>{
    ContactsModel.model.paginate({userId: userId}, {page: pageNo}, (err, result)=>{
        callbackFn(err, result);
    });
}

ContactsModel.findRecentContacts = (userId, callbackFn)=>{
    ContactsModel.model.find({userId: userId})
    .sort({dateCreated: -1})
    .limit(5)
    .exec((err, result)=>{
        callbackFn(err, result);
    });
}

module.exports = ContactsModel;