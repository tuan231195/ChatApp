var mongoose = require("mongoose");
var fs = require("fs");
var User = mongoose.model("User");

function sendJSONresponse(res, status, message) {
    res.status(status).json(message);
}
module.exports.upload = function (req, res) {
    var imagePath = __dirname + "/../../public/" + req.user.image;
    var imageFile = "images/" + req.file.filename;
    fs.unlink(imagePath, function () {
        User.findByIdAndUpdate(req.user._id, {$set: {image: imageFile}}, {new: true}, function (err, user) {
            if (err) {
                res.status(500).json({error: "Error saving user"});
                return;
            }
            var jwt = user.generateJwt();
            res.status(200).json({
                "token": jwt
            });
        });
    });
};

module.exports.update = function (req, res) {
    User.findById(req.user._id, function (err, user) {
        if (err) {
            res.status(404).json({error: "Error finding user"});
            return;
        }
        if (user.isValidPassword(req.body.oldPassword)) {
            console.log(req.body.oldPassword);
            user.generateHash(req.body.newPassword);
            console.log(user.hash);
            user.save(function (err) {
                if (err) {
                    res.status(500).json({error: "Error saving user"});
                    return;
                }
                var jwt = user.generateJwt();
                res.status(200).json({
                    "token": jwt
                });

            });
        }
        else {
            res.status(400).json({error: "Invalid password"});
        }
    });
};
