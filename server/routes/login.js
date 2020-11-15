const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

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

async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();

    return {
        name: payload.name,
        email: payload.email,
        img: payload.picture,
        google: true
    }
};

app.post('/google', async(req, res) => {

    let token = req.body.idtoken;

    let googleUser = await verify(token)
        .catch(err => {
            return res.status(403).json({
                ok: false,
                err
            });
        });

    User.findOne({ email: googleUser.email }, (err, userDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };

        if (userDB) {
            if (userDB.google === false) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'You must use your normal authentication'
                    }
                });
            }
            let token = jwt.sign({
                user: userDB
            }, process.env.SEED, { expiresIn: process.env.EXP_TOKEN });

            return res.json({
                ok: true,
                user: userDB,
                token,
            });
        }

        let user = new User();
        user.name = googleUser.name;
        user.email = googleUser.email;
        user.img = googleUser.img;
        user.google = true;
        user.password = ':)';

        user.save((err, userStored) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            };

            let token = jwt.sign({
                user: userStored
            }, process.env.SEED, { expiresIn: process.env.EXP_TOKEN });

            return res.json({
                ok: true,
                user: userStored,
                token,
            });
        });
    });
});

module.exports = app;