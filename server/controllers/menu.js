const Menu = require('../models/menu');
const MenuDetail = require('../models/menuDetail');

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

const getById = async(req, res) => {
    let menuId = req.params.id;

    Menu.findById(menuId).exec((err, menu) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        let menuSearchData = {
            menu: menuId
        };

        MenuDetail.find(menuSearchData)
            .populate('product', 'description')
            .exec((errr, ingredients) => {
                if (errr) {
                    return res.status(500).json({
                        ok: false,
                        errr
                    });
                }

                res.json({
                    ok: true,
                    menu,
                    ingredients
                });
            });
    });
};

const getByCategory = async(req, res) => {
    let menuCategory = req.params.category;
    let menuSearchData = {
        status: true,
        category: menuCategory
    };

    Menu.find(menuSearchData).exec((err, menus) => {
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
        price: body.price,
        category: body.category
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
    create,
    getById,
    getByCategory
}