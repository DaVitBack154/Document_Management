const query = require('./database')
const mssql = require('mssql')


module.exports.Getfinancial = async () => {
    let parameters = [
    ]
    let sql = `
    SELECT id, company, FORMAT(year_doc, 'yyyy') as year_doc, 
    quarter, FORMAT(date_doc, 'yyyy-MM-dd') as date_doc, FORMAT(approve_doc, 'yyyy-MM-dd') as approve_doc
    FROM tb_docall
    WHERE type = 'financial'
    `
    let datainternal = await query(sql, parameters);
    return datainternal;
}

module.exports.Createfinancial = async (body) => {
    let parameters = [
        { name: "company", sqltype: mssql.VarChar, value: body.company },
        { name: "year_doc", sqltype: mssql.Date, value: body.year_doc },
        { name: "quarter", sqltype: mssql.VarChar, value: body.quarter },
        { name: "date_doc", sqltype: mssql.Date, value: body.date_doc },
        { name: "approve_doc", sqltype: mssql.Date, value: body.approve_doc },
    ]
    // console.log(body)
    let sql = `
        INSERT INTO tb_docall (company, year_doc, quarter, date_doc, approve_doc, type)
        OUTPUT Inserted.id
        VALUES (@company, @year_doc, @quarter, @date_doc, @approve_doc, 'financial')
    `
    let datainternal = await query(sql, parameters);
    console.log('=>', datainternal)
    return datainternal;
}

module.exports.UpdatefinancialByID = async (id, body) => {
    let parameters = [
        { name: "company", sqltype: mssql.VarChar, value: body.company },
        { name: "year_doc", sqltype: mssql.Date, value: body.year_doc },
        { name: "quarter", sqltype: mssql.VarChar, value: body.quarter },
        { name: "date_doc", sqltype: mssql.Date, value: body.date_doc },
        { name: "approve_doc", sqltype: mssql.Date, value: body.approve_doc },
        { name: "id", sqltype: mssql.Int, value: id }
    ];

    let sql = `
        UPDATE tb_docall SET 
        company = @company,
        year_doc = @year_doc,
        quarter = @quarter,
        date_doc = @date_doc,
        approve_doc = @approve_doc
        OUTPUT INSERTED.*
        WHERE id = @id
    `;
    let update = await query(sql, parameters);
    console.log(update)
    return update;
}

module.exports.GetfinancialID = async (id) => {
    let parameters = [
        { name: "id", sqltype: mssql.Int, value: id },
    ]

    let sql = `
        SELECT id, company, year_doc, quarter, date_doc, approve_doc, type
        FROM tb_docall WHERE id = @id
    `
    let user = await query(sql, parameters);
    return user;
}