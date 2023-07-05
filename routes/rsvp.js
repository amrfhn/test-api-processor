const express = require('express');
const router = express.Router();
const Rsvp = require('../models/rsvp');

// Getting all
router.get('/', async (req, res) => {
    try {
        const rsvpList = await Rsvp.find()
        res.json(rsvpList);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
// Getting one
// Creating one
router.post('/', async (req, res) => {
    const rsvpList = new Rsvp({
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        guestType: req.body.guestType,
        numberPax: req.body.numberPax,
        timeslot: req.body.timeslot,
    })

    try {
        const newRsvp = await rsvpList.save();
        res.status(201).json(newRsvp);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})
// Updating one
// Deleting one
router.delete('/:id', (req, res) => {
    Rsvp.findByIdAndDelete(req.params.id).then((rsvp) => {
        if (!rsvp) {
            return res.status(404).send();
        }
        res.send(rsvp);
    }).catch((error) => {
        res.status(500).send(error);
    })
})

module.exports = router;