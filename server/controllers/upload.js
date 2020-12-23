const User = require('../models/user');
const Menu = require('../models/menu');
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
    const validTypes = ['users', 'menus'];
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

        if (type === 'users') {
            userImage(id, res, fileNameToSave);
        } else {
            menuImage(id, res, fileNameToSave);
        }
    });
};

function userImage(id, res, fileNameToSave) {

    User.findById(id, (err, userDB) => {
        if (err) {
            deleteImg('users', fileNameToSave);
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!userDB) {
            deleteImg('users', fileNameToSave);
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no existe'
                }
            });
        }

        deleteImg('users', fileNameToSave);
        userDB.img = fileNameToSave;

        userDB.save((err, userStored) => {
            return res.json({
                ok: true,
                user: userStored
            });
        });
    });
}

function menuImage(id, res, fileNameToSave) {
    Menu.findById(id, (err, menuDB) => {
        if (err) {
            deleteImg('menus', fileNameToSave);
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!menuDB) {
            deleteImg('menus', fileNameToSave);
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Menu no existe'
                }
            });
        }

        deleteImg('menus', menuDB.img);
        menuDB.img = fileNameToSave;

        menuDB.save((err, menuStored) => {
            return res.json({
                ok: true,
                menu: menuStored
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