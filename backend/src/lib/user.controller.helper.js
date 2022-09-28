const getByName = ({ users, name }) => {
    return users.filter((user) =>
    user.name?.toLowerCase().includes(name.toLowerCase())
    )
}


const getByEmail = ({ users, email }) => {
    return users.filter((user) => 
    user.email?.toLowerCase().includes(email.toLowerCase())
    )
}

module.exports = {
    getByName,
    getByEmail
}