const db = require('../../data/dbConfig')

function find() {
    return db('sers')
        .select('*')
}


function findById(id){
    return db('users')
        .where('id', id)
        .first()
}


function findByUsername(username){
    return db('users')
        .where("username", username)
        .first()
}

async function add(user){
    const [id] = await db('users').insert(user)
    return findById(id)
}

module.exports = {
    find,
    findById,
    findByUsername,
    add

}