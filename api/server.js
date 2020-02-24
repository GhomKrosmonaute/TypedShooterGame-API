
const api = require('express')()
const bodyParser = require('body-parser')
const router = require('./router')
const port = 2834

api.use( 
    bodyParser.json(), 
    bodyParser.urlencoded({ extended: true }),
    ( req, res, next ) => {
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.setHeader("Access-Control-Allow-Header", "Content-Type")
        next()
    },
    router
)

api.listen( port, () => {
    console.log('Connected to localhost:' + port)
})