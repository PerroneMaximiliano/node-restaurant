const ProductCategory = require('../models/productCategories');

const list = async(req, res) => {
    ProductCategory.find({ status: true })
        .exec((err, productCategories) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            ProductCategory.countDocuments({ status: true }, (err, size) => {
                res.json({
                    ok: true,
                    productCategories,
                    size
                });
            });
        });
};

const create = async(req, res) => {
    let body = req.body;
    let productCategories = new ProductCategory({
        description: body.description,
        parent: body.parent,
        status: true
    });

    productCategories.save((err, categoryStored) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            productCategory: categoryStored
        });
    });
};

const update = async(req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['description']);

    ProductCategory.findByIdAndUpdate(id, body, { new: true, runValidators: true },
        (err, categoryStored) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                productCategory: categoryStored
            });
        });
};

const remove = async(req, res) => {
    let id = req.params.id;
    let changeStatus = {
        status: false
    };

    ProductCategory.findByIdAndUpdate(id, changeStatus, { new: true },
        (err, categoryDeleted) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!categoryDeleted) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'Product category not found'
                    }
                });
            }

            res.json({
                ok: true,
                productCategory: categoryDeleted
            });
        });
};

module.exports = {
    list,
    create,
    update,
    remove
}