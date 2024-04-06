const HttpError = require("../httpError");
const fs = require("fs");
const path = require("path");
const { imgPath } = require("../utility");

exports.getImg = async (req, res, next) => {
    try {
        const file = await fs.readFileSync(path.join(imgPath, req.params.imgURL));
        if(!file) throw new HttpError(404, "image not found");
        res.sendFile(path.join(imgPath, req.params.imgURL));
    } catch(err) {
        next(err);
    }
};

exports.deleteImg = async (url) => {
    const file = fs.readFileSync(path.join(imgPath, url));
    if(!file) throw new HttpError(404, "image not found");

    fs.unlink(path.join(imgPath, url), err => {
        if(err) throw err;
    });
};