const query = require('./database')
const mssql = require('mssql')


module.exports.Getinternalmemo = async (year, month) => {
    let parameters = [
        { name: "month", sqltype: mssql.Int, value: parseInt(month) },
        { name: "year", sqltype: mssql.Int, value: parseInt(year) },
    ]
    let sql = `
    SELECT id, number_book, detail, issued, receive, 
    FORMAT(date_doc, 'yyyy-MM-dd') as date_doc, remark,
    type_data, location, esign, img_internal_memo
    FROM tb_internal_memo
    WHERE MONTH(date_doc) = @month
    AND YEAR(date_doc) = @year
    `
    let datainternal = await query(sql, parameters);
    return datainternal;
}
module.exports.Getdatainternalmemoall = async () => {
    let parameters = [
    ]
    let sql = `
    SELECT id, number_book, detail, issued, receive, 
    FORMAT(date_doc, 'yyyy-MM-dd') as date_doc, remark, type_data,
    location, esign, img_internal_memo
    FROM tb_internal_memo
    `
    let datainternal = await query(sql, parameters);
    return datainternal;
}

module.exports.Createinternalmemo = async (body) => {
    let parameters = [
        { name: "number_book", sqltype: mssql.VarChar, value: body.number_book },
        { name: "detail", sqltype: mssql.VarChar, value: body.detail },
        { name: "issued", sqltype: mssql.VarChar, value: body.issued },
        { name: "receive", sqltype: mssql.VarChar, value: body.receive },
        { name: "date_doc", sqltype: mssql.Date, value: body.date_doc },
        { name: "remark", sqltype: mssql.VarChar, value: body.remark },
        { name: "type_data", sqltype: mssql.VarChar, value: body.type_data },
        { name: "location", sqltype: mssql.VarChar, value: body.location },
        { name: "esign", sqltype: mssql.VarChar, value: body.esign },
        { name: "img_internal_memo", sqltype: mssql.VarChar, value: body.img_internal_memo },
    ]
    // console.log(body)
    let sql = `
        INSERT INTO tb_internal_memo (number_book, detail, issued, receive, date_doc, remark, type_data, location, esign, img_internal_memo)
        OUTPUT Inserted.id
        VALUES (@number_book, @detail, @issued, @receive, @date_doc, @remark, @type_data, @location, @esign, @img_internal_memo)
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
    FROM tb_internal_memo
    WHERE type_data = @type_data
    ORDER BY id DESC
    `, parameters)
    return user;
    // SELECT TOP(1) id, type_data +'/' + CONVERT(varchar, year(GETDATE()) ) + '/'+ convert (varchar , FORMAT( right (number_book,3) + 1 , '000')) as  test
    // FROM tb_internal_memo
    // ORDER BY id DESC
}

module.exports.GetinternalmemoID = async (id) => {
    let parameters = [
        { name: "id", sqltype: mssql.Int, value: id },
    ]

    let sql = `
        SELECT id, number_book, detail, issued, receive, 
        FORMAT(date_doc, 'yyyy-MM-dd') as date_doc, remark,  type_data,
        location, esign, img_internal_memo
        FROM tb_internal_memo WHERE id = @id
    `
    let user = await query(sql, parameters);
    return user;
}

module.exports.UpdateinternalmemoID = async (id, body) => {
    let parameters = [
        { name: "detail", sqltype: mssql.VarChar, value: body.detail },
        { name: "issued", sqltype: mssql.VarChar, value: body.issued },
        { name: "receive", sqltype: mssql.VarChar, value: body.receive },
        { name: "date_doc", sqltype: mssql.Date, value: body.date_doc },
        { name: "remark", sqltype: mssql.VarChar, value: body.remark },
        { name: "location", sqltype: mssql.VarChar, value: body.location },
        { name: "esign", sqltype: mssql.VarChar, value: body.esign },
        { name: "img_internal_memo", sqltype: mssql.VarChar, value: body.img_internal_memo },
        { name: "id", sqltype: mssql.Int, value: id },
    ];

    let sql = `
        UPDATE tb_internal_memo SET 
        detail = @detail,
        issued = @issued,
        receive = @receive,
        date_doc = @date_doc,
        remark = @remark,
        location = @location,
        esign = @esign,
        img_internal_memo = @img_internal_memo
        OUTPUT INSERTED.*
        WHERE id = @id
    `;
    let update = await query(sql, parameters);
    console.log(update)
    return update;
}

