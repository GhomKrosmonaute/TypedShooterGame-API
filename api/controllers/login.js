
const jwt = require('jsonwebtoken')
const { hash } = require('../../utils')
const config = require('../../data/config.json')

module.exports = async function login( req, res ){

    const neededArgs = [ 'username', 'password' ]

    for(const arg of neededArgs){
        if(!req.body[arg])
        return res.status(422).json({ error: `Missing ${arg} argument.`, neededArgs })
    }

    let player = await this.getPlayer('WHERE username=?',[req.body.username])

    if(!player){

        player = {
            username: req.body.username,
            password: hash( req.body.password )
        }

        try{
            const { insertId } = await this.exec('INSERT INTO player (username, password) VALUES (?,?)',[player.username,player.password])
            player.id = insertId
        }catch(error){
            return res.status(501).json({ error: `The username is already used` })
        }

    }else{

        const password = hash( req.body.password )

        if(player.password !== password)
            return res.status(401).json({ error: `Invalid password for this user` })

    }

    const token = newToken(player)
    res.status(200).json({ token })

}

function newToken( player ){
    return jwt.sign( JSON.stringify(player), config.secret )
}