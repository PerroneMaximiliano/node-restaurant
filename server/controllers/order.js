const Order = require('../models/order');
const OrderDetail = require('../models/orderDetail');
const MenuDetail = require('../models/menuDetail');
const Product = require('../models/product');

const list = async(req, res) => {
    let status = req.params.status;
    let filterStatus = {};
    if (status != undefined) {
        filterStatus = {
            status
        }
    }
    Order.find(filterStatus).exec((err, orders) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        Order.countDocuments({ status }).exec((err, size) => {
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

    try {
        let orderFoods = [];
        let orderDrinks = [];

        for (const food of body.foods) {
            const menuDetailData = await MenuDetail.find({ menu: food.id })
                .populate('menu', 'description')
                .populate('product', ['description', 'current_stock']);
            for (const menuDetail of menuDetailData) {
                let quantity = menuDetail.quantity * food.quantity;
                if (quantity > menuDetail.product.current_stock) {
                    return res.status(400).json({
                        ok: false,
                        err: {
                            message: 'No hay stock disponible para ' + menuDetail.menu.description
                        }
                    });
                }
                orderFoods.push(menuDetail);
            }
        }

        for (const drink of body.drinks) {
            const productData = await Product.findOne({ _id: drink.id });
            if (drink.quantity > productData.current_stock) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'No hay stock disponible para ' + productData.description
                    }
                });
            }

            const merged = {
                id: productData._id,
                currentStock: productData.current_stock,
                quantity: drink.quantity
            }
            orderDrinks.push(merged);
        }

        let order = new Order({
            orderDate: body.orderDate,
            endDate: 'calcular',
            number: body.number,
            shippingType: body.shippingType,
            user: body.user
        });

        order.save((err, orderStored) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            for (let food of body.foods) {
                saveOrderDetail(orderStored._id, food, true);
            }

            for (let drink of body.drinks) {
                saveOrderDetail(orderStored._id, drink, false);
            }

            return res.json({
                ok: true,
                order: orderStored
            });
        });

    } catch (err) {
        return res.status(500).json({
            ok: false,
            err
        });
    }
};

function saveOrderDetail(orderId, detail, flag) {
    let orderDetail = new OrderDetail({
        quantity: detail.quantity,
        subTotal: detail.subTotal,
        status: true,
        order: orderId
    });
    console.log(orderDetail);
    flag ? orderDetail.menu = detail.id : orderDetail.product = detail.id;
    orderDetail.save();
}

const update = async(req, res) => {
    const id = req.params.id;
    const status = req.body.status;
    Order.findByIdAndUpdate(id, { status }, { new: true, runValidators: true }, (err, orderStored) => {
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