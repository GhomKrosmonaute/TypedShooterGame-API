
const jwt = require('jsonwebtoken')
const Grecaptcha = require('grecaptcha')
const { hash } = require('../../utils')
const config = require('../../data/config.json')
const client = new Grecaptcha(config.secret)

module.exports = async function login( req, res ){

    const neededArgs = [ 'username', 'password', 'token' ]

    for(const arg of neededArgs){
        if(!req.body[arg])
        return res.status(422).json({ error: `Missing ${arg} argument.`, neededArgs })
    }

    if (await client.verify(req.body.token)) {

        let player = await this.getPlayer('WHERE username=?',[req.body.username])

        if(!player){

            player = {
                username: req.body.username,
                password: hash( req.body.password )
            }

            const { insertId } = await this.exec('INSERT INTO player (username, password) VALUES (?,?)',[player.username,player.password])
            player.id = insertId

        }else{

            const password = hash( req.body.password )

            if(player.password !== password)
                return res.status(401).json({ error: `Invalid password for this user` })

        }

        const token = newToken(player)
        res.status(200).json({ token })

    } else {
        return res.status(500).json({ error: `reCAPTCHA token denied.` })
    }

}

function newToken( player ){
    return jwt.sign( JSON.stringify(player), config.secret )
}