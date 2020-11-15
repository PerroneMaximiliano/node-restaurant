const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();

app.post('/login', (req, res) => {

    let body = req.body;

    User.findOne({ email: body.email }, (err, user) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!user) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'User or password invalid'
                }
            });
        }

        if (!bcrypt.compareSync(body.password, user.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'User or password invalid 2'
                }
            });
        }

        let token = jwt.sign({
            user
        }, process.env.SEED, { expiresIn: process.env.EXP_TOKEN });

        res.json({
            ok: true,
            user,
            token
        });
    });
});

module.exports = app;