const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET

const protectRoutes = async (req, res, next) => {
    const token = req.cookies.jwt || req.body.jwt
    if (!token)
        res.status(400).json({ msg: 'No JWT' }).send()
    else {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(400).json({ err })
            }
            else {
                const { id } = decoded
                req.body.id = id
                next()
            }
        })
    }
}

module.exports = { protectRoutes }