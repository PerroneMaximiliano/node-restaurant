const Bill = require('../models/bill');

const list = async(req, res) => {
    Bill.find({ status: true }).exec((err, bills) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        Bill.countDocuments({ status: true }, (err, size) => {
            res.json({
                ok: true,
                bills,
                size
            });
        });
    });
};

const create = async(req, res) => {
    let body = req.body;
    let bill = new Bill({
        orderDate: body.orderDate,
        number: body.number,
        discount: body.discount,
        total: body.total,
        paymentType: body.paymentType,
        nroCard: body.nroCard,
        status: body.status
    });

    bill.save((err, billStored) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            bill: billStored
        });
    });
};

const update = async(req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['orderDate', 'number', 'discount',
        'total', 'paymentType', 'nroCard', 'status'
    ]);

    Bill.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, billStored) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            bill: billStored
        });
    });
};

const remove = async(req, res) => {
    let id = req.params.id;
    let changeStatus = {
        status: false
    };

    Bill.findByIdAndUpdate(id, changeStatus, { new: true }, (err, billDeleted) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!billDeleted) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Bill not found'
                }
            });
        }

        res.json({
            ok: true,
            bill: billDeleted
        });
    });
};

module.exports = {
    list,
    create,
    update,
    remove
}