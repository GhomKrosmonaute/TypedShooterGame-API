
const api = require('express')()
const path = require('path')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const cors = require('cors')

const db = require('./database')
const routes = require('./routes')
const config = require('../data/config')

api.use(
    cors(),
    bodyParser.json(), 
    bodyParser.urlencoded({ extended: true })
)

for(const route of routes){
    api[route.method.toLowerCase()]( route.path,
        route.needToken ? needToken : (req,res,next) => next(),
        require('./controllers/' + route.controller).bind(db)
    )
}

api.listen( config.port, () => {
    console.log( 'Connected to localhost:' + config.port )
})

function needToken( req, res, next ){
    const header = req.headers['authorization']
    const token = header && header.split(/\s+/)[1]
    if(!token) return res.status(401).json({error: 'Access token is needed'})
    jwt.verify( token, config.secret, { ignoreExpiration: true }, (error, player) => {
        if(error) return res.status(403).json({error: 'Access token is invalid'})
        req.player = player
        next()
    })
}