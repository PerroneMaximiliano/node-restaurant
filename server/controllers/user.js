const bcrypt = require('bcrypt');
const _ = require('underscore');
const User = require('../models/user');

const list = async(req, res) => {
    let from = req.query.from || 0;
    let limit = req.query.limit || 10;

    User.find({ status: true })
        .skip(Number(from))
        .limit(Number(limit))
        .exec((err, users) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            User.countDocuments({ status: true }, (err, size) => {
                res.json({
                    ok: true,
                    users,
                    size
                });
            });
        });
}

const create = async(req, res) => {
    let body = req.body;
    let user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    user.save((err, userStored) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            user: userStored
        });
    });
}

const update = async(req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['name', 'email', 'img', 'role', 'status']);

    User.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, userStored) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            user: userStored
        });
    });
}

const remove = async(req, res) => {
    let id = req.params.id;
    let changeStatus = {
        status: false
    };

    User.findByIdAndUpdate(id, changeStatus, { new: true }, (err, userDeleted) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!userDeleted) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'User not found'
                }
            });
        }

        res.json({
            ok: true,
            user: userDeleted
        });
    });
};

const search = async(req, res) => {
    let search = req.params.words;
    let regExWords = new RegExp(search, 'i');

    User.find({ $or: [{ name: regExWords }, { email: regExWords }] })
        .exec((err, users) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            User.countDocuments({ status: true }, (err, size) => {
                res.json({
                    ok: true,
                    users,
                    size
                });
            });
        });
};


module.exports = {
    list,
    create,
    update,
    remove,
    search
}