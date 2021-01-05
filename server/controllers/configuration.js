const Configuration = require('../models/configuration');

const list = async(req, res) => {
    Configuration.findOne().exec((err, config) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            config
        });
    });
};

const create = async(req, res) => {
    let body = req.body;
    let config = new Configuration({
        quantityCooks: body.quantityCooks,
        email: body.email,
        password: body.password
    });

    config.save((err, configStored) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            config: configStored
        });
    });
};

const update = async(req, res) => {
    let id = req.params.id;
    let body = req.body;
    Configuration.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, configStored) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            config: configStored
        });
    });
};

module.exports = {
    list,
    create,
    update
}