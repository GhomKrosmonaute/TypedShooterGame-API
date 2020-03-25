
async function getScore(req, res) {

    const id = req.player.id

    const { score } = await this.getPlayer('WHERE id=?',[id],'score')

    res.status(200).json({ score })

}

module.exports = getScore