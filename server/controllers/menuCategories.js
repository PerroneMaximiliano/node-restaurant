const MenuCategory = require('../models/menuCategories');

const list = async(req, res) => {
    MenuCategory.find({ status: true })
        .exec((err, menuCategories) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            MenuCategory.countDocuments({ status: true }, (err, size) => {
                res.json({
                    ok: true,
                    menuCategories,
                    size
                });
            });
        });
};

const create = async(req, res) => {
    let body = req.body;
    let menuCategory = new MenuCategory({
        description: body.description,
        status: true
    });

    menuCategory.save((err, menuCategoryStored) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            menuCategory: menuCategoryStored
        });
    });
};

const update = async(req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['description']);

    MenuCategory.findByIdAndUpdate(id, body, { new: true, runValidators: true },
        (err, menuCategoryStored) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                menuCategory: menuCategoryStored
            });
        });
};

const remove = async(req, res) => {
    let id = req.params.id;
    let changeStatus = {
        status: false
    };

    MenuCategory.findByIdAndUpdate(id, changeStatus, { new: true },
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
                        message: 'Menu category not found'
                    }
                });
            }

            res.json({
                ok: true,
                menuCategory: categoryDeleted
            });
        });
};

module.exports = {
    list,
    create,
    update,
    remove
}