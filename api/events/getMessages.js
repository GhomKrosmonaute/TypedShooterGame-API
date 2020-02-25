
module.exports = function( req, res ){

    res.status(200).json(this.prepare(`
        SELECT
            message.id,
            message.content,
            message.user_id,
            user.pseudo
        FROM message
        LEFT JOIN user
        ON message.user_id = user.id
    `).all())

}