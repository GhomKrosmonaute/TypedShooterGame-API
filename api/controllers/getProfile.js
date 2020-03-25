
module.exports = async function getProfile(req, res) {

    console.log(req.player) // undefined
    res.status(200).json(req.player)

}