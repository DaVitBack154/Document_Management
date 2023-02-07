const doc_model = require('../model/doc_model')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')



module.exports.login = async (req, res) => {
    let { username, password } = req.body
    try {
        let result = await doc_model.login(username, password)
        if (result == false) {
            return res.json({ status: false, message: "user or password invalid" })
        }
        const user = result[0]
        const payload = {
            user: {
                id: user.id,
                username: user.username,
                role: user.role,
            }
        }
        console.log(payload)
        jwt.sign(payload, 'jwttokota', (err, token) => {
            if (err) throw err;
            return res.json({ status: true, data: user, token })
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Faild')
    }
}

module.exports.logout = async (req, res) => {
    req.session.destroy();
    return res.json({ status: true, message: "logout successfully" });
};

module.exports.Getprofile = async (req, res, next) => {
    console.log('decode', req.user)
    let userid = req.user.id
    console.log('userid=>', userid)

    let profiles = await doc_model.Getprofile(userid)
    console.log(profiles)
    if (profiles.length < 1) {
        return res.json({ status: false, message: 'Not found profile' })
    }
    let userdata = profiles[0]
    return res.json({ status: true, data: userdata })
}

module.exports.register = async (req, res) => {
    let body = req.body;
    let users = await doc_model.getUserByUsername(body.username);
    if (users.length > 0) {
        return res.json({ status: false, message: "exists user" });
    }

    let result = await doc_model.register(body);
    if (!result)
        return res.json({ status: false, message: "failed to register" });
    return res.json({ status: true, message: "register successfully" });
};