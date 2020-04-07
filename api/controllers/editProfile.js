
const { hash } = require('../../utils')

async function editProfile(req, res) {

    const neededArgs = [ 'newUsername', 'newPassword', 'password' ]

    for(const arg of neededArgs)
        if(!req.body[arg])
            return res.status(422).json({ error: `Missing ${arg} argument.`, neededArgs })

    const id = req.player.id
    const password = req.player.password
    const username = req.player.username
    const testPassword = hash(req.body.password)
    const newUsername = req.body.newUsername
    const newPassword = hash(req.body.newPassword)

    if(username !== newUsername){
        const userWithSameName = await this.getPlayer('WHERE username = ?',[newUsername])
        if(userWithSameName) return res.status(402).json({error:'The username already exists'})
    }

    if(password !== testPassword)
        return res.status(401).json({ error: `Invalid password for this user` })

    await this.exec('UPDATE player SET username = ?, password = ? WHERE id = ?',[newUsername,newPassword,id])

    res.sendStatus(200)

}

module.exports = editProfile