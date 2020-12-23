const fs = require('fs');
const path = require('path');

const getById = async(req, res) => {
    let type = req.params.type;
    let img = req.params.img;
    let pathImage = path.resolve(__dirname, `../../uploads/${type}/${img}`);

    if (fs.existsSync(pathImage)) {
        res.sendFile(pathImage);
    } else {
        let noImagePath = path.resolve(__dirname, '../assets/image-not-found.png');
        res.sendFile(noImagePath);
    }
};

module.exports = {
    getById
}