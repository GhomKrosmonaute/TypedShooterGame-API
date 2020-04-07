
async function getHighScore(req, res) {

    const id = req.player.id

    const result = await this.exec(`
        SELECT score
        FROM party
        WHERE player_id = ?
        ORDER BY score DESC
        LIMIT 1
    `,[id])

    if(!result || result.length === 0) res.status(200).json(0)
    else res.status(200).json(result[0].score)

}

module.exports = getHighScore