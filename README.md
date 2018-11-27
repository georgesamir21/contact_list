# Contact List
**To start this project you need to have**
* Nodejs, npm and MongoDB installed
* To have the project files setup and installed run `npm install` to install node_modules
* To start the project run `npm start`
***You will be having the node server listening on PORT 8080***

### Project description
* it has three end points:
    * Add Contact
    * Get Contacts, paginated
    * Get Recent Contacts, latest five
* We have a dummy HARDCODED users example:
***Note: These users will be stored in the database in future***
```
let userA = {
    _id: 1,
    "authorization" : "ff34555392bcd3f268f74d29daf1f819336616f115a38f73318354b374763b05079c0ab18f68",
    "deviceToken" : "0b0c968654b27e0701ad2bf5772d1cdcffe8e149cd6506e3ffd35c8e36cbcfe64116e47a217ae6b1f8cb908e067ae108c14f0077424712195aebf39c8cb747b7811891e201e",
    "fingerPrint" : "123456789",
    "name": "User A"
}
```

* In order to user any endpoint I use three way authorization `authorization` && `deviceToken` && `fingerPrint` these must be sent in the `request headers`

#### Add Contact
path: `/contact/add`, method `POST`, request body:
```
{
        firstName: "string",
        lastName: "string",
        email: "string",
        mobile: "string",
        userId: userId
}
```
response: 
```
{
 statusCode: response.statusCode,
 success: true,
 message: "Contcat added!",
 data: the-added-documnet-data
}
```
***Note: userId is fetched from the request headers***

#### Get Contacts
path: `/contact/getList`, method `POST`, request body:
```
{
    "pageNo": "number"
}
```
response: 
```
{
 statusCode: response.statusCode,
 success: true,
 message: "Conatcts list",
 data: list-of-contacts-in-this-page
}
```
***Note: userId is fetched from the request headers***


#### Get Recent Contacts
path: `/contact/getRecentList`, method `POST`
***Note: userId is fetched from the request headers***

response: 
```
{
 statusCode: response.statusCode,
 success: true,
 message: "Recent List",
 data: list-of-recent-contacts
}
```
