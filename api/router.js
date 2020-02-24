
const express = require('express')
const controllers = require('./controllers')
const routes = require('./routes.json')

const router = express.Router()

for(const route in routes){
    const [ fullmatch, method, path ] = /^([A-Z]+)(.+)$/.exec(route)
    const controllerName = routes[route]
    router.route(path)[method.toLowerCase()](( req, res ) => {
        return controllers[controllerName]( req, res )
    })
    console.log('Route loaded:', method, path)
}

console.log('Router ready:', router.stack.length, 'routes')

module.exports = router