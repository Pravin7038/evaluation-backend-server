const jwt = require("jsonwebtoken")

const auth = (req, res, next) => {

    const { authorization } = req.headers;

    const token = authorization.split(" ")[1];

    jwt.verify(token, "pravin", (err, decoded) => {

        console.log(decoded)
        if (decoded) {
            req.userid = decoded.userid;
            req.username = decoded.username;
            next();
        }
        else {

            res.send({ "error": "something went wrong" })
        }
    })

}

module.exports = auth;