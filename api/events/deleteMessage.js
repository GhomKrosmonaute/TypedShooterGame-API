
const path = require('path')
const config = require(path.resolve(__dirname,'../../data/config.json'))

module.exports = function( req, res ){

    const neededArgs = [ 'token', 'id' ]

    for(const arg of neededArgs){
        if(!req.body[arg])
        return res.status(422).json({ error: `Missing ${arg} argument.`, neededArgs })
    }

    if(req.body.token !== config.admin){

        const user = this.prepare('SELECT * FROM user WHERE token=?').get(req.body.token)
    
        if(!user)
        return res.status(422).json({ error: 'Invalid token.' })
    
        const message = this.prepare('SELECT * FROM message WHERE id=?').get(req.body.id)
    
        if(!message)
        return res.status(422).json({ error: 'Invalid message id.' })
    
        if(message.user_id !== user.id)
        return res.status(500).json({ error: 'This message does not belong to you' })

    }else{

        const message = this.prepare('SELECT * FROM message WHERE id=?').get(req.body.id)
    
        if(!message)
        return res.status(422).json({ error: 'Invalid message id.' })

    }


    this.prepare('DELETE FROM message WHERE id=?').run(req.body.id)
    res.status(200).json({ message: 'Your message has been deleted.' })

}