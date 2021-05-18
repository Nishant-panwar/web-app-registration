const express = require('express');
const router = express.Router();

const Redis = require('../Database/Redis');

/**
 * API: /api/registration/fetch
 */
router.get("/fetch", (req, res) => {
    let email = req.query.email;

    if (email === null || email === undefined) {
        return res.status(400).send('Bad Request');
    }

    Redis.fetch(email)
        .then((data) => {
            res.send(data);
        })
        .catch(() => {
            res.status(500).send('Internal Server Error');
        })

});

/**
 * API: /api/registration/save
 */
router.get("/save", (req, res) => {
    let email = req.query.email;
    let userDetails = req.query.userdetails;

    if (email === null || email === undefined || userDetails === null || userDetails === undefined) {
        return res.status(400).send('Bad Request');
    }


    Redis.fetch(email)
        .then((data) => {
            if (data !== null) {
                res.send({ code: 200, msg: 'Email already registered' });
            }
            else {
                Redis.save(email, userDetails)
                    .then(() => {
                        res.send({ code: 200, msg: 'Successfully registered' });
                    })
                    .catch(() => {
                        res.status(500).send('Internal Server Error');
                    })
            }

        })
        .catch(() => {
            res.status(500).send('Internal Server Error');
        })



});

module.exports = router;