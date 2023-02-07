const query = require('./database')
const mssql = require('mssql')


module.exports.Getcertificate = async () => {
    let parameters = [
    ]
    let sql = `
    SELECT id, company, type_doc, number_doc, FORMAT(date_doc, 'yyyy-MM-dd') as date_doc, 
    branc_doc, remark
    FROM tb_docall
    WHERE type = 'certificate'
    `
    let datainternal = await query(sql, parameters);
    return datainternal;
}

module.exports.Createcertificate = async (body) => {
    let parameters = [
        { name: "company", sqltype: mssql.VarChar, value: body.company },
        { name: "type_doc", sqltype: mssql.VarChar, value: body.type_doc },
        { name: "number_doc", sqltype: mssql.VarChar, value: body.number_doc },
        { name: "date_doc", sqltype: mssql.Date, value: body.date_doc },
        { name: "branc_doc", sqltype: mssql.VarChar, value: body.branc_doc },
        { name: "remark", sqltype: mssql.VarChar, value: body.remark },
    ]
    // console.log(body)
    let sql = `
        INSERT INTO tb_docall (company, type_doc, number_doc, date_doc, branc_doc, remark, type)
        OUTPUT Inserted.id
        VALUES (@company, @type_doc, @number_doc, @date_doc, @branc_doc, @remark, 'certificate')
    `
    let datainternal = await query(sql, parameters);
    console.log('=>', datainternal)
    return datainternal;
}

module.exports.UpdatecertificateByID = async (id, body) => {
    let parameters = [
        { name: "company", sqltype: mssql.VarChar, value: body.company },
        { name: "type_doc", sqltype: mssql.VarChar, value: body.type_doc },
        { name: "number_doc", sqltype: mssql.VarChar, value: body.number_doc },
        { name: "date_doc", sqltype: mssql.Date, value: body.date_doc },
        { name: "branc_doc", sqltype: mssql.VarChar, value: body.branc_doc },
        { name: "remark", sqltype: mssql.VarChar, value: body.remark },
        { name: "id", sqltype: mssql.Int, value: id }
    ];

    let sql = `
        UPDATE tb_docall SET 
        company = @company,
        type_doc = @type_doc,
        number_doc = @number_doc,
        date_doc = @date_doc,
        branc_doc = @branc_doc,
        remark = @remark
        OUTPUT INSERTED.*
        WHERE id = @id
    `;
    let update = await query(sql, parameters);
    console.log(update)
    return update;
}

module.exports.GetcertificateID = async (id) => {
    let parameters = [
        { name: "id", sqltype: mssql.Int, value: id },
    ]

    let sql = `
        SELECT id, company, type_doc, number_doc, date_doc, branc_doc, remark, type
        FROM tb_docall WHERE id = @id
    `
    let user = await query(sql, parameters);
    return user;
}