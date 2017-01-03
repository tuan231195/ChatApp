var mongoose = require("mongoose");
var crypto = require("crypto");
var jwt = require("jsonwebtoken");

var userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    hash: {type: String, required: true},
    salt: {type: String, required: true},
    image: {type: String, required: true},
    gender: {type: String, required: true}
});

userSchema.methods.generateHash = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

userSchema.methods.isValidPassword = function (password) {
    return this.hash === crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};


userSchema.methods.generateJwt = function (expiry) {
    if (!expiry)
    {
        expiry = new Date();
        expiry.setDate(expiry.getDate() + 7);
    }
    return jwt.sign({
        _id: this._id,
        username: this.username,
        exp: parseInt(expiry.getTime() / 1000),
        gender: this.gender,
        image: this.image
    }, process.env.JWT_SECRET);
};
mongoose.model("User", userSchema);