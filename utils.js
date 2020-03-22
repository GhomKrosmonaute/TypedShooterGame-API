
const config = require('./data/config')
const crypto = require('crypto')

module.exports = {
    hash: ( password ) => {
        return crypto.createHash('sha256').update( password + config.secret ).digest('hex')
    }
}