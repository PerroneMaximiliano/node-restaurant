const User = require('../models/user');
const Menu = require('../models/menu');
const MenuCategories = require('../models/menuCategories');
const ProductCategories = require('../models/productCategories');
const fs = require('fs');
const path = require('path');

const upload = async(req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: "No se ha seleccionado ningún archivo"
            }
        });
    }

    let type = req.params.type;
    let id = req.params.id;
    const validTypes = ['users', 'menus', 'menu-categories', 'product-categories'];
    if (validTypes.indexOf(type) < 0) {
        return res.json({
            ok: true,
            err: {
                message: 'Los tipos permitidos son ' + validTypes.join(', ')
            }
        });
    }

    let sampleFile = req.files.file;
    let fileName = sampleFile.name;
    let fileNameSplit = fileName.split('.');
    let fileExtension = fileNameSplit[fileNameSplit.length - 1];
    const validExtensions = ['png', 'jpg'];

    if (validExtensions.indexOf(fileExtension) < 0) {
        return res.json({
            ok: true,
            err: {
                message: 'Las extensiones permitidas son ' + validExtensions.join(', ')
            }
        });
    }

    let fileNameToSave = `${id}-${new Date().getMilliseconds()}.${fileExtension}`;
    let pathToSave = `uploads/${type}/${fileNameToSave}`;

    sampleFile.mv(pathToSave, (err) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        let collection = null;

        switch (type) {
            case 'users':
                collection = User;
                break;
            case 'menus':
                collection = Menu;
                break;
            case 'menu-categories':
                collection = MenuCategories;
                break;
            case 'product-categories':
                collection = ProductCategories;
                break;
            default:
                break;
        }

        const genericUpload = {
            id,
            res,
            fileNameToSave,
            model: collection,
            folder: type
        };

        addImageToObject(genericUpload);
    });
};

function addImageToObject(upload) {
    upload.model.findById(upload.id, (err, objectDB) => {
        if (err) {
            deleteImg(upload.folder, upload.fileNameToSave);
            return upload.res.status(500).json({
                ok: false,
                err
            });
        }

        if (!objectDB) {
            deleteImg(upload.folder, upload.fileNameToSave);
            return upload.res.status(400).json({
                ok: false,
                err: {
                    message: 'Object do not exist with id ' + upload.id
                }
            });
        }

        deleteImg(upload.folder, objectDB.img);
        objectDB.img = upload.fileNameToSave;

        objectDB.save((err, objectStored) => {
            return upload.res.json({
                ok: true,
                result: objectStored
            });
        });
    });
}

function deleteImg(type, fileName) {
    let pathImage = path.resolve(__dirname, `../../uploads/${ type }/${ fileName }`);
    if (fs.existsSync(pathImage)) {
        fs.unlinkSync(pathImage);
    }
}

module.exports = {
    upload
}