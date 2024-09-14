const bodyParseGetRequest = (req,res,next)=>{
    req.body = req.query
    req.body.id = req.query.id
    next()
}
module.exports = bodyParseGetRequest