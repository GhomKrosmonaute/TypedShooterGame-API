
module.exports = async function getProfile(req, res) {

    if(!req.player) return res.status(500).json({ error: 'PLS' })

    res.status(200).json(req.player)

}