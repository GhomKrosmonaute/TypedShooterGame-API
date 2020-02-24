
module.exports = function( req, res ){

    res.status(200).json( this.prepare('SELECT * FROM messages').all() )

}