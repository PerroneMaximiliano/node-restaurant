const Product = require('../models/product');
const _ = require('underscore');

const list = async(req, res) => {
    Product.find({ status: true }).exec((err, products) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        Product.countDocuments({ status: true }, (err, size) => {
            res.json({
                ok: true,
                products,
                size
            });
        });
    });
};

const getByCategory = async(req, res) => {

    let productCategory = req.params.category;
    let productSearchData = {
        status: true,
        category: productCategory
    };

    Product.find(productSearchData).exec((err, products) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        Product.countDocuments((err, size) => {
            res.json({
                ok: true,
                products,
                size
            });
        });
    });
};

const create = async(req, res) => {
    let body = req.body;
    let product = new Product({
        description: body.description,
        purchase_price: body.purchase_price,
        sale_price: body.sale_price,
        current_stock: body.current_stock,
        min_stock: body.min_stock,
        unit_measurement: body.unit_measurement,
        supplies: body.supplies,
        status: true,
        category: body.category
    });

    product.save((err, productStored) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            product: productStored
        });
    });
};

const update = async(req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['description', 'purchase_price',
        'sale_price', 'current_stock', 'min_stock', 'category'
    ]);
    console.log(body);
    Product.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, userStored) => {
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
};

const remove = async(req, res) => {
    let id = req.params.id;
    let changeStatus = {
        status: false
    };

    Product.findByIdAndUpdate(id, changeStatus, { new: true }, (err, productDeleted) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productDeleted) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Product not found'
                }
            });
        }

        res.json({
            ok: true,
            product: productDeleted
        });
    });
};

module.exports = {
    list,
    create,
    update,
    remove,
    getByCategory
}