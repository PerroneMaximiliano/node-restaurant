const OrderDetail = require('../models/orderDetail');

const list = async(req, res) => {
    OrderDetail.find({ status: true }).exec((err, orderDetails) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        OrderDetail.countDocuments({ status: true }, (err, size) => {
            res.json({
                ok: true,
                orderDetails,
                size
            });
        });
    });
};

const create = async(req, res) => {
    let body = req.body;
    let orderDetail = new OrderDetail({
        quantity: body.quantity,
        subTotal: body.subTotal,
        status: body.status,
        order: body.order
    });

    orderDetail.save((err, orderDetailStored) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            orderDetail: orderDetailStored
        });
    });
};

const update = async(req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['quantity',
        'subTotal', 'status', 'order'
    ]);

    OrderDetail.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, orderDetailStored) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            orderDetail: orderDetailStored
        });
    });
};

const remove = async(req, res) => {
    let id = req.params.id;
    let changeStatus = {
        status: false
    };

    OrderDetail.findByIdAndUpdate(id, changeStatus, { new: true }, (err, detailDeleted) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!detailDeleted) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Order detail not found'
                }
            });
        }

        res.json({
            ok: true,
            orderDetail: detailDeleted
        });
    });
};

const rank = async(req, res) => {
    OrderDetail.find({ status: true, menu: { $ne: null } })
        .populate('menu description')
        .exec((err, details) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            var result = [];
            details.reduce(function(res, value) {
                if (!res[value.menu._id]) {
                    res[value.menu._id] = { menu: value.menu._id, quantity: 0, description: value.menu.description };
                    result.push(res[value.menu._id])
                }
                res[value.menu._id].quantity += value.quantity;
                return res;
            }, {});

            res.json({
                ok: true,
                result: result.sort((a, b) => b.quantity - a.quantity),
                size: result.length
            });
        });
};

module.exports = {
    list,
    create,
    update,
    remove,
    rank
}