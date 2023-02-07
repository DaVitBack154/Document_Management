const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
    try {
        const token = req.headers.authorization.replace('Bearer ', '')
        console.log(req.headers)
        if (!token) {
            return res.status(401).send("no Token")
        } else {
            const decode = jwt.verify(token, 'jwttokota')
            console.log("middleware", decode);
            req.user = decode.user
            next()
        }
    } catch (err) {
        console.log(err)
        res.status(401).send('Token invalid')
    }
}