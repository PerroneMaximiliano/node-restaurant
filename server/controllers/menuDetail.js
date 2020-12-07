const MenuDetail = require('../models/menuDetail');

const list = async(req, res) => {
    MenuDetail.find()
        .populate('product', 'description')
        .populate('menu', 'description finished_time price')
        .exec((err, menusDetail) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            MenuDetail.countDocuments((err, size) => {
                res.json({
                    ok: true,
                    menusDetail,
                    size
                });
            });
        });
};

const create = async(req, res) => {
    let body = req.body;
    let menuDetail = new MenuDetail({
        quantity: body.quantity,
        unit_measurement: body.unit_measurement,
        product: body.product,
        menu: body.menu
    });

    menuDetail.save((err, menuDetailStored) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            menuDetail: menuDetailStored
        });
    });
};

module.exports = {
    list,
    create
}