const { createConnection } = require('mysql2')
const config = require('../data/config.json')

const db = createConnection(config.database)

db.exec = function(sql,values){
    return new Promise( (res,rej) => {
        this.execute(sql,values, (err,result) => {
            if(err) rej(err)
            res(result)
        })
    })
}

db.getPlayers = function(sqlCond,values,props = '*'){
    return this.exec(`SELECT ${props} FROM player ${sqlCond}`, values )
}

db.getPlayer = async function(sqlCond,values,props = '*'){
    const results = await this.getPlayers(sqlCond,values,props)
    return results[0]
}

module.exports = db