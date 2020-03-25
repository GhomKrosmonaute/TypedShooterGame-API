
const api = require('express')()
const Captcha = require('grecaptcha')
const path = require('path')
const jwt = require('jsonwebtoken')
const expressIp = require('express-ip')
const { IpFilter } = require('express-ipfilter')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./database')

const routes = require('./routes')
const config = require('../data/config')

const captcha = new Captcha(config.secret)

const whitelistDomains = ['https://camilleabella.github.io','http://localhost:9000']
const blackListIP = []

api.next = (req,res,next) => next()

api.use(
    cors({
        origin: function (origin, callback) {
            if (typeof origin === 'string' && whitelistDomains.includes(origin.toLowerCase()))
                callback(null, true)
            else callback('Intrusion: '+String(origin))
        }
    }),
    IpFilter(blackListIP),
    expressIp().getIpInfoMiddleware,
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true })
)

for(const route of routes){
    api[route.method.toLowerCase()]( route.path,
        route.needToken ? needToken : api.next,
        route.method === 'PATCH' ? needCaptcha : api.next,
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

async function needCaptcha( req, res, next ){
    if(!req.body.token) return res.status(422).json({ error: `Missing reCAPTCHA token.` })
    if (await captcha.verify(req.body.token)) next()
    else res.status(500).json({ error: `reCAPTCHA token denied.` })
}