
async function setScore(req, res) {

    const id = req.player.id
    const score = req.body.score

    await this.exec('UPDATE player SET score = ? WHERE id = ?',[score,id])

    res.sendStatus(200)

}

module.exports = setScore