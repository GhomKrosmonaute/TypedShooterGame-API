

async function deleteProfile( req, res ){

    const id = req.player.id

    this.exec("DELETE FROM player WHERE id = ?", [id])
        .then(()=>{res.sendStatus(200)})
        .catch(()=>{res.sendStatus(500)})

}

module.exports = deleteProfile