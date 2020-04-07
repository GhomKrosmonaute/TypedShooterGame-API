
async function registerResult(req, res) {

    const id = req.player.id

    const neededArgs = [ 'score', 'duration', 'kills', 'precision' ]

    for(const arg of neededArgs)
        if(!req.body[arg])
            return res.status(422).json({ error: `Missing ${arg} argument.`, neededArgs })

    await this.exec('INSERT INTO party (score,duration,kills,`precision`,player_id) VALUES (?,?,?,?,?)',[
        req.body.score,
        req.body.duration,
        req.body.kills,
        req.body.precision,
        id
    ])

    res.sendStatus(200)

}

module.exports = registerResult