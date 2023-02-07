const query = require('./database');
const mssql = require('mssql');

module.exports.Getethics = async () => {
  let parameters = [];
  let sql = `
    SELECT id, company, FORMAT(year_doc, 'yyyy') as year_doc, policy,
    FORMAT(date_doc, 'yyyy-MM-dd') as date_doc, FORMAT(date_approve, 'yyyy-MM-dd') as date_approve
    FROM tb_docall
    WHERE type = 'ethics'
    `;
  let datainternal = await query(sql, parameters);
  return datainternal;
};

module.exports.Createethics = async (body) => {
  let parameters = [
    { name: 'company', sqltype: mssql.VarChar, value: body.company },
    { name: 'year_doc', sqltype: mssql.Date, value: body.year_doc },
    { name: 'policy', sqltype: mssql.VarChar, value: body.policy },
    { name: 'date_doc', sqltype: mssql.Date, value: body.date_doc },
    { name: 'date_approve', sqltype: mssql.Date, value: body.date_approve },
  ];
  // console.log(body)
  let sql = `
        INSERT INTO tb_docall (company, year_doc, policy, date_doc, date_approve, type)
        OUTPUT Inserted.id
        VALUES (@company, @year_doc, @policy, @date_doc, @date_approve, 'ethics')
    `;
  let datainternal = await query(sql, parameters);
  console.log('=>', datainternal);
  return datainternal;
};

module.exports.UpdateethicsByID = async (id, body) => {
  let parameters = [
    { name: 'company', sqltype: mssql.VarChar, value: body.company },
    { name: 'year_doc', sqltype: mssql.Date, value: body.year_doc },
    { name: 'policy', sqltype: mssql.VarChar, value: body.policy },
    { name: 'date_doc', sqltype: mssql.Date, value: body.date_doc },
    { name: 'date_approve', sqltype: mssql.Date, value: body.date_approve },
    { name: 'id', sqltype: mssql.Int, value: id },
  ];

  let sql = `
        UPDATE tb_docall SET 
        company = @company,
        year_doc = @year_doc,
        policy = @policy,
        date_doc = @date_doc,
        date_approve = @date_approve
        OUTPUT INSERTED.*
        WHERE id = @id
    `;
  let update = await query(sql, parameters);
  console.log(update);
  return update;
};

module.exports.GetethicsID = async (id) => {
  let parameters = [{ name: 'id', sqltype: mssql.Int, value: id }];

  let sql = `
        SELECT id, company, FORMAT(year_doc, 'yyyy') as year_doc, policy,
        FORMAT(date_doc, 'yyyy-MM-dd') as date_doc, FORMAT(date_approve, 'yyyy-MM-dd') as date_approve
        FROM tb_docall WHERE id = @id
    `;
  let user = await query(sql, parameters);
  return user;
};
