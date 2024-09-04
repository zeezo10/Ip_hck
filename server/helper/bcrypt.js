const bcrypt = require("bcryptjs")

const hashingPassword = (password) =>{
    let salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password ,salt)
    
}

const comparePassword = (password, hashedPassword) =>{
    return bcrypt.compareSync(password,hashedPassword)
}



module.exports = {
    hashingPassword,
    comparePassword
}