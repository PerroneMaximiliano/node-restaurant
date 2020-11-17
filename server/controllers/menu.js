const Menu = require('../models/menu');

const list = async(req, res) => {
    Menu.find().exec((err, menus) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        Menu.countDocuments((err, size) => {
            res.json({
                ok: true,
                menus,
                size
            });
        });
    });
};

const create = async(req, res) => {
    let body = req.body;
    let menu = new Menu({
        description: body.description,
        finished_time: body.finished_time,
        price: body.price
    });

    menu.save((err, menuStored) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            menu: menuStored
        });
    });
};

module.exports = {
    list,
    create
}