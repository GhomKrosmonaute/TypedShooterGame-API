
module.exports = async function getProfile(req, res) {

    res.status(200).json(req.player)

}