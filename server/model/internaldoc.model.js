const query = require('./database')
const mssql = require('mssql')

module.exports.Getinternaldoc = async (year, month) => {
    let parameters = [
        { name: "month", sqltype: mssql.Int, value: parseInt(month) },
        { name: "year", sqltype: mssql.Int, value: parseInt(year) },
    ]
    let sql = `
    SELECT id, number_book, detail, issued, authorized_signatory,
    FORMAT(date_doc, 'yyyy-MM-dd') as date_doc, remark,
    type_data, location, esign, img_internal_doc
    FROM tb_internal_doc
    WHERE MONTH(date_doc) = @month
    AND YEAR(date_doc) = @year
    `
    let externadata = await query(sql, parameters);
    return externadata;
}
module.exports.Getdatainternaldocall = async () => {
    let parameters = [
    ]
    let sql = `
    SELECT id, number_book, detail, issued, authorized_signatory, 
    FORMAT(date_doc, 'yyyy-MM-dd') as date_doc, remark, type_data,
    location, esign, img_internal_doc
    FROM tb_internal_doc
    `
    let datainternal = await query(sql, parameters);
    return datainternal;
}
module.exports.Createinternaldoc = async (body) => {
    let parameters = [
        { name: "number_book", sqltype: mssql.VarChar, value: body.number_book },
        { name: "detail", sqltype: mssql.VarChar, value: body.detail },
        { name: "issued", sqltype: mssql.VarChar, value: body.issued },
        { name: "authorized_signatory", sqltype: mssql.VarChar, value: body.authorized_signatory },
        { name: "date_doc", sqltype: mssql.Date, value: body.date_doc },
        { name: "remark", sqltype: mssql.VarChar, value: body.remark },
        { name: "type_data", sqltype: mssql.VarChar, value: body.type_data },
        { name: "location", sqltype: mssql.VarChar, value: body.location },
        { name: "esign", sqltype: mssql.VarChar, value: body.esign },
        { name: "img_internal_doc", sqltype: mssql.VarChar, value: body.img_internal_doc },
    ]
    // console.log(body)
    let sql = `
        INSERT INTO tb_internal_doc (number_book, detail, issued, authorized_signatory, date_doc, remark, type_data, location, esign, img_internal_doc)
        OUTPUT Inserted.id
        VALUES (@number_book, @detail, @issued, @authorized_signatory, @date_doc, @remark, @type_data, @location, @esign, @img_internal_doc)
    `
    let datainternal = await query(sql, parameters);
    console.log('=>', datainternal)
    return datainternal;
}

module.exports.Lastnumberbook = async (number_book, type_data) => {
    console.log(number_book)
    let parameters = [
        { name: 'number_book', sqltype: mssql.VarChar, value: number_book },
        { name: 'type_data', sqltype: mssql.VarChar, value: type_data }
    ]
    let user = await query(`
    SELECT TOP(1) id, number_book, type_data, date_doc
    FROM tb_internal_doc
    WHERE type_data = @type_data
    ORDER BY id DESC
    `, parameters)
    return user;
}

module.exports.GetinternaldocID = async (id) => {
    let parameters = [
        { name: "id", sqltype: mssql.Int, value: id },
    ]

    let sql = `
        SELECT id, number_book, detail, issued, authorized_signatory,
        FORMAT(date_doc, 'yyyy-MM-dd') as date_doc, remark,  type_data,
        location, esign, img_internal_doc
        FROM tb_internal_doc WHERE id = @id
    `
    let user = await query(sql, parameters);
    return user;
}


module.exports.UpdateinternaldocID = async (id, body) => {
    let parameters = [
        { name: "detail", sqltype: mssql.VarChar, value: body.detail },
        { name: "issued", sqltype: mssql.VarChar, value: body.issued },
        { name: "authorized_signatory", sqltype: mssql.VarChar, value: body.authorized_signatory },
        { name: "date_doc", sqltype: mssql.Date, value: body.date_doc },
        { name: "remark", sqltype: mssql.VarChar, value: body.remark },
        { name: "location", sqltype: mssql.VarChar, value: body.location },
        { name: "esign", sqltype: mssql.VarChar, value: body.esign },
        { name: "img_internal_doc", sqltype: mssql.VarChar, value: body.img_internal_doc },
        { name: "id", sqltype: mssql.Int, value: id },
    ];

    let sql = `
        UPDATE tb_internal_doc SET 
        detail = @detail,
        issued = @issued,
        authorized_signatory = @authorized_signatory,
        date_doc = @date_doc,
        remark = @remark,
        location = @location,
        esign = @esign,
        img_internal_doc = @img_internal_doc
        OUTPUT INSERTED.*
        WHERE id = @id
    `;
    let update = await query(sql, parameters);
    console.log(update)
    return update;
}


module.exports.reportinternaldoc = async (year, month) => {
    let parameters = [
        { name: "month", sqltype: mssql.Int, value: parseInt(month) },
        { name: "year", sqltype: mssql.Int, value: parseInt(year) },
    ]
    let sql = `
    SELECT
    COUNT(CASE WHEN type_data = 'chase' then 'chase' end) as chase,
    COUNT(CASE WHEN type_data = 'rway' then 'rway' end) as rway, 
    COUNT(CASE WHEN type_data = 'cmt' then 'cmt' end) as cmt, 
    COUNT(CASE WHEN type_data = 'cfam' then 'cfam' end) as cfam,
    COUNT(CASE WHEN type_data = 'aa' then 'aa' end) as aa,    
    COUNT(id) as total
    FROM tb_internal_doc
    WHERE MONTH(date_doc) = @month
    AND YEAR(date_doc) = @year
    `;
    let user = await query(sql, parameters);
    return user;
}