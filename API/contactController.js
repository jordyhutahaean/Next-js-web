// contactController.js

// Import contact model
const Contact = require('./contactModel');

const req = require('request');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const wrapAsync = handler => (req, res) => handler(req)
    .then(result => res.json(result))
    .catch(error => res.status(500).json({ error: error.message}))

// Handle index actions
router.get('/',(req, res, next) => {
    Contact.find().then(data => {

        console.log(data)

        if (!data) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json(
             data
        );
    })
    });


//Handle create contact actions
router.post('/', (req, res) => {

    var id = req.body.id;
    var contact = new Contact();

    contact.name = req.body.name ? req.body.name : contact.name;
    contact.gender = req.body.gender;
    contact.email = req.body.email;
    contact.phone = req.body.phone;

// save the contact and check for errors
    contact.save(function (err) {
        if (err)
            res.json(err);
        res.json({
            message: 'New contact created!',
            data: contact
        });
    });
});

// // Handle view contact info
router.get('/:contact_id',(req,res)=> {
    Contact.findById(req.params.contact_id).then(data => {
        if(!data){
            res.json({
                statis:"error",
                message: err,
            });
        }
        res.json(
            data
        );
    })
});

// // Handle update contact info
router.put('/:contact_id',(req, res) => {

Contact.findById(req.params.contact_id, function (err, contact) {
        if (err)
            res.send(err);

        contact.name = req.body.name ? req.body.name : contact.name;
        contact.gender = req.body.gender;
        contact.email = req.body.email;
        contact.phone = req.body.phone;

// save the contact and check for errors
        contact.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Contact Info updated',
                data: contact
            });
        });
    });
});

// // Handle delete contact
router.delete('/:contact_id',(req, res) => {
    Contact.remove({
        _id: req.params.contact_id
    }, function (err, contact) {
        if (err)
            res.send(err);

        res.json({
            status: "success",
            message: 'Contact deleted'
        });
    });
});

module.exports = router;