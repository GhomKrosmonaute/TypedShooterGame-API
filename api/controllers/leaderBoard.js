
async function getLeaderBoard(req, res) {

    const mode = Number(req.query.mode)
    const id = req.player.id

    let leaderBoard = null

    switch (mode) {
        case 0:
            leaderBoard = await this.exec(`
                SELECT
                    pl.username, pr.score, pr.\`precision\`, pr.kills, pr.duration
                FROM party pr
                LEFT JOIN player pl 
                ON pr.player_id = pl.id
                WHERE pr.score > 0
                ORDER BY 
                    pr.score DESC,
                    pr.\`precision\` DESC,
                    pr.duration ASC,
                    pr.kills DESC
                LIMIT 30
            `)
            break
        case 1:
            leaderBoard = await this.exec(`
                SELECT
                    pl.username,
                    AVG(pr.score) AS score,
                    AVG(pr.\`precision\`) AS \`precision\`,
                    AVG(pr.kills) AS kills,
                    AVG(pr.duration) AS duration
                FROM player pl
                LEFT JOIN party pr
                ON pr.player_id = pl.id
                WHERE score IS NOT NULL
                GROUP BY pl.username
                ORDER BY
                    score DESC,
                    \`precision\` DESC,
                    duration ASC,
                    kills DESC
                LIMIT 30
            `)
            break
        case 2:
            leaderBoard = await this.exec(`
                SELECT
                    pl.username,
                    SUM(pr.score) AS score,
                    AVG(pr.\`precision\`) AS \`precision\`,
                    SUM(pr.kills) AS kills,
                    SUM(pr.duration) AS duration
                FROM player pl
                LEFT JOIN party pr
                ON pr.player_id = pl.id
                WHERE score IS NOT NULL
                GROUP BY pl.username
                ORDER BY
                    score DESC,
                    \`precision\` DESC,
                    duration ASC,
                    kills DESC
                LIMIT 30
            `)
            break
    }

    res.status(200).json(leaderBoard)

}

module.exports = getLeaderBoard