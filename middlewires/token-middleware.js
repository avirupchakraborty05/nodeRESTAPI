const jwt = require("jsonwebtoken")


const generateWebToken = (req, res, next) => {
    const id = req.id;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
        time: Date(),
        userId: id,
    }

    const token = jwt.sign(data, "my_secrey_key", {
        algorithm: "HS256",
        expiresIn: 10000,
    })
    req.token = token;
    next()
}


const verifyWebToken = (req, res, next) => {
    var token = req.headers['x-access-token'];
    console.log(token);
    if (token) {
        jwt.verify(token, "my_secrey_key",
            {
                algorithm: "HS256"

            }, function (err, decoded) {
                if (err) {
                    let errordata = {
                        message: err.message,
                        expiredAt: err.expiredAt
                    };
                    console.log(errordata);
                    return res.status(401).json({
                        message: 'Unauthorized Access'
                    });
                }
                req.decoded = decoded;
                console.log(decoded);
                next();
            });
    } else {
        return res.status(403).json({
            message: 'Forbidden Access'
        });
    }

}

module.exports = { generateWebToken,verifyWebToken }
