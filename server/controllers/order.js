const Order = require('../models/order');

const list = async(req, res) => {
    Order.find().exec((err, orders) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        Order.countDocuments((err, size) => {
            res.json({
                ok: true,
                orders,
                size
            });
        });
    });
};

const create = async(req, res) => {
    let body = req.body;
    let order = new Order({
        orderDate: body.orderDate,
        endDate: body.endDate,
        number: body.number,
        status: body.status,
        shippingType: body.shippingType
    });

    order.save((err, orderStored) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            order: orderStored
        });
    });
};

const update = async(req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['startDate', 'endDate',
        'number', 'status', 'shippingType'
    ]);

    Order.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, orderStored) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            order: orderStored
        });
    });
};

module.exports = {
    list,
    create,
    update
}