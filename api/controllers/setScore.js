
async function setScore(req, res) {

    const id = req.player.id
    const score = req.body.score

    if(!score) return res.status(422).json({ error: `Missing score argument.` })

    await this.exec('UPDATE player SET score = ? WHERE id = ?',[score,id])

    res.sendStatus(200)

}

module.exports = setScore