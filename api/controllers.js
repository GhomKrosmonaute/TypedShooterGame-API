
const path = require('path')
const db = require('better-sqlite3')(path.resolve(__dirname,'../data/sqlite.db'))
const views = require('./views')

db.prepare(`
    CREATE TABLE IF NOT EXISTS user (
        id integer PRIMARY KEY,
        pseudo varchar(64) NOT NULL,
        password varchar(64) NOT NULL,
        token varchar(2048) NOT NULL
    )
`).run()
db.prepare(`
    CREATE TABLE IF NOT EXISTS message (
        id integer PRIMARY KEY,
        user_id integer NOT NULL,
        content varchar(164) NOT NULL,
        CONSTRAINT fk_user_message
            FOREIGN KEY (user_id)
            REFERENCES user(id)
            ON DELETE CASCADE
    )
`).run()

module.exports = {
    homePage: async ( req, res ) => {
        res.setHeader('Content-Type','text/html')
        res.status(200).send(views.home)
    },
    loginPage: async ( req, res ) => {
        res.setHeader('Content-Type','text/html')
        res.status(200).send(views.login)
    },
    login: require('./events/login').bind(db),
    deleteMessage: require('./events/deleteMessage').bind(db),
    getMessages: require('./events/getMessages').bind(db),
    postMessage: require('./events/postMessage').bind(db)
}