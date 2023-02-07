const query = require('./database');
const mssql = require('mssql');

module.exports.Getregisdoc = async () => {
  let parameters = [];
  let sql = `
    SELECT id, company, type_doc, FORMAT(year_doc, 'yyyy') as year_doc,
    number_doc, FORMAT(date_doc, 'yyyy-MM-dd') as date_doc, remark, image
    FROM tb_docall
    WHERE type = 'regisdoc'
    `;
  let datainternal = await query(sql, parameters);
  return datainternal;
};

module.exports.Createregisdoc = async (body) => {
  let parameters = [
    { name: 'company', sqltype: mssql.VarChar, value: body.company },
    { name: 'type_doc', sqltype: mssql.VarChar, value: body.type_doc },
    { name: 'year_doc', sqltype: mssql.Date, value: body.year_doc },
    { name: 'number_doc', sqltype: mssql.VarChar, value: body.number_doc },
    { name: 'date_doc', sqltype: mssql.Date, value: body.date_doc },
    { name: 'remark', sqltype: mssql.VarChar, value: body.remark },
    { name: 'image', sqltype: mssql.VarChar, value: body.image },
  ];
  // console.log(body)
  let sql = `
        INSERT INTO tb_docall (company, type_doc, year_doc, number_doc, date_doc, remark, image, type)
        OUTPUT Inserted.id
        VALUES (@company, @type_doc, @year_doc, @number_doc, @date_doc, @remark, @image, 'regisdoc')
    `;
  let datainternal = await query(sql, parameters);
  console.log('=>', datainternal);
  return datainternal;
};

module.exports.UpdateregisdocByID = async (id, body) => {
  let parameters = [
    { name: 'company', sqltype: mssql.VarChar, value: body.company },
    { name: 'type_doc', sqltype: mssql.VarChar, value: body.type_doc },
    { name: 'year_doc', sqltype: mssql.Date, value: body.year_doc },
    { name: 'number_doc', sqltype: mssql.VarChar, value: body.number_doc },
    { name: 'date_doc', sqltype: mssql.Date, value: body.date_doc },
    { name: 'remark', sqltype: mssql.VarChar, value: body.remark },
    { name: 'image', sqltype: mssql.VarChar, value: body.image },
    { name: 'id', sqltype: mssql.Int, value: id },
  ];

  let sql = `
        UPDATE tb_docall SET 
        company = @company,
        type_doc = @type_doc,
        year_doc = @year_doc,
        number_doc = @number_doc,
        date_doc = @date_doc,
        remark = @remark,
        image = @image
        OUTPUT INSERTED.*
        WHERE id = @id
    `;
  let update = await query(sql, parameters);
  console.log(update);
  return update;
};

module.exports.GetregisdocID = async (id) => {
  let parameters = [{ name: 'id', sqltype: mssql.Int, value: id }];

  let sql = `
        SELECT id, company, type_doc, year_doc, number_doc, date_doc, remark, image, type
        FROM tb_docall WHERE id = @id
    `;
  let user = await query(sql, parameters);
  return user;
};
