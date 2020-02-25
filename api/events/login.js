
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const path = require('path')
const config = require(path.resolve(__dirname,'../../data/config.json'))

module.exports = async function( req, res ){

    const neededArgs = [ 'pseudo', 'password' ]

    for(const arg of neededArgs){
        if(!req.body[arg])
        return res.status(422).json({ error: `Missing ${arg} argument.`, neededArgs })
    }

    let user = this.prepare('SELECT * FROM user WHERE pseudo=?').get(req.body.pseudo)

    if(!user){

        user = {
            pseudo: req.body.pseudo,
            password: await bcrypt.hash( req.body.password, 8 )
        }

        user.token = jwt.sign( user, config.secret )

        this.prepare('INSERT INTO user (pseudo, password, token) VALUES (?,?,?)').run(
            user.pseudo,
            user.password,
            user.token
        )

    }else{

        const password = await bcrypt.hash( req.body.password, 8 )

        console.log(user.password,password)

        if(user.password !== password)
        return res.status(500).json({ error: `Invalid password for this user` })

    }

    res.status(200).json({ message: 'Yay !', token: user.token })

}