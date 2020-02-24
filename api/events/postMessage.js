
module.exports = function( req, res ){

    const neededArgs = [ 'token', 'content', 'pseudo' ]

    for(const arg of neededArgs){
        if(!req.body[arg])
        return res.status(422).json({ error: `Missing ${arg} argument.`, neededArgs })
    }

    this.prepare('INSERT INTO message (content, user_id) VALUES (?,?)').run(
        req.body.content,
        user.id
    )

    res.status(200).json({ message: 'Your message has been posted.' })

}