const query = require('./database')
const mssql = require('mssql')


module.exports.login = async (username, password) => {
    let parameters = [
        { name: "username", sqltype: mssql.VarChar, value: username },
        { name: "password", sqltype: mssql.VarChar, value: password },
    ]

    let result = await query(
        `SELECT * FROM tb_user WHERE username = @username AND password = @password`,
        parameters
    )
    return result;
}

module.exports.Getprofile = async (userid) => {
    console.log(userid)
    let parameters = [
        { name: "id", sqltype: mssql.Int, value: userid },
    ]
    let user = await query(`
        SELECT username, role, name
        FROM tb_user 
        WHERE id = @id
    `, parameters)
    console.log('user', user)
    return user;
}

module.exports.getUserByUsername = async (username) => {
    let parameters = [
        { name: "username", sqltype: mssql.VarChar, value: username },
    ]

    let user = await query('SELECT * FROM tb_user WHERE username = @username', parameters)
    return user;
}

module.exports.register = async (body) => {
    let sql = `
        INSERT INTO tb_user (username, password, name, role)
        OUTPUT Inserted.id
        VALUES (@username, @password, @name, 1)
    `
    let parameters = [
        { name: "username", sqltype: mssql.VarChar, value: body.username },
        { name: "password", sqltype: mssql.VarChar, value: body.password },
        { name: "name", sqltype: mssql.VarChar, value: body.name },
    ]

    let result = await query(sql, parameters)
    return result
}