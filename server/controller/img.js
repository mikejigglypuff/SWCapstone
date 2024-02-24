const HttpError = require("../httpError");
const fs = require("fs");
const { imgPath } = require("../utility");

exports.getImg = async (req, res, next) => {
    try {
        const file = await fs.readFileSync(`${imgPath}${req.params.imgURL}`);
        if(!file) throw new HttpError(404, "image not found");
        res.sendFile(file);
    } catch(err) {
        next(err);
    }
};

exports.deleteImg = async (url) => {
    const file = await fs.readFileSync(`${imgPath}${url}`);
    if(!file) throw new HttpError(404, "image not found");

    fs.unlink(`../uploads/img/${url}`, err => {
        if(err) throw err;
    });
};