
const { hash } = require('../../utils')

module.exports = async function setProfile(req, res) {

    const id = req.player.id
    const username = req.player.username
    const newUsername = req.body.username
    const password = hash(req.body.password)

    if(username !== newUsername){
        const userWithSameName = await this.getPlayer('WHERE username = ?',[newUsername])
        if(userWithSameName) return res.status(401).json({error:'The username already exists'})
    }
    await this.exec('UPDATE player SET username = ?, password = ? WHERE id = ?',[newUsername,password,id])

    res.sendStatus(200)

}