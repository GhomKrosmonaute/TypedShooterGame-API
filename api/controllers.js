
const fs = require('fs').promises
const path = require('path')
const db = require('better-sqlite3')(path.resolve(__dirname,'../data/sqlite.db'))

db.prepare(`
    CREATE TABLE IF NOT EXISTS messages (
        id integer PRIMARY KEY,
        content varchar(150) NOT NULL,
        pseudo varchar(64) NOT NULL
    )
`).run()

module.exports = {
    home: async ( req, res ) => {
        res.setHeader('Content-Type','text/html')
        const homePage = await fs.readFile(
            path.resolve(__dirname,'../views/home.html'), 
            { encoding: 'utf8' }
        )
        res.status(200).send(homePage)
    },
    deleteMessage: ( req, res ) => {

        db.prepare('DELETE FROM messages WHERE id=?').run(req.body.id)
        res.status(200).json({ message: 'Your message has been deleted.' })

    },
    getMessages: ( req, res ) => {

        res.status(200).json( db.prepare('SELECT * FROM messages').all() )

    },
    postMessage: ( req, res ) => {

        const neededArgs = [ 'content', 'pseudo' ]

        for(const arg of neededArgs){
            if(!req.body[arg])
            return res.status(422).json({ error: `Missing ${arg} argument.` })
        }

        db.prepare('INSERT INTO messages (content, pseudo) VALUES (?,?)').run(
            req.body.content,
            req.body.pseudo
        )

        res.status(200).json({ message: 'Your message has been posted.' })
    }
}