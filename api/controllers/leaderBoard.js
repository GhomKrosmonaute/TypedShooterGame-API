
module.exports = async function getLeaderBoard(req, res) {

    const id = req.player.id
    const leaderBoard = {
        top: await this.getPlayers('ORDER BY score DESC LIMIT 30',[id],'score, username'),
        player: await new Promise( resolve => {
            this.execute(`
                SELECT a.username, a.score, (
                    SELECT COUNT(*)
                    FROM player b
                    WHERE b.score >= a.score
                ) AS "position"
                FROM player a  
                WHERE a.id = ?
            `,[id], (err,results) => {
                if(err) throw err
                resolve(results[0])
            })
        })
    }

    res.status(200).json(leaderBoard)

}