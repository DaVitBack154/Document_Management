const query = require('./database');
const mssql = require('mssql');

module.exports.Getsealcom = async () => {
  let parameters = [];
  let sql = `
    SELECT id, number_doc, story, FORMAT(date_doc, 'yyyy-MM-dd') as date_doc,  byto,
    FORMAT(date_own, 'yyyy-MM-dd') as date_own, department, remark, company
    FROM tb_docall
    WHERE type = 'sealcom'
    `;
  let datainternal = await query(sql, parameters);
  return datainternal;
};

module.exports.Createsealcom = async (body) => {
  let parameters = [
    { name: 'number_doc', sqltype: mssql.VarChar, value: body.number_doc },
    { name: 'story', sqltype: mssql.VarChar, value: body.story },
    { name: 'date_doc', sqltype: mssql.Date, value: body.date_doc },
    { name: 'byto', sqltype: mssql.VarChar, value: body.byto },
    { name: 'date_own', sqltype: mssql.Date, value: body.date_own },
    { name: 'department', sqltype: mssql.VarChar, value: body.department },
    { name: 'remark', sqltype: mssql.VarChar, value: body.remark },
    { name: 'company', sqltype: mssql.VarChar, value: body.company },
  ];
  // console.log(body)
  let sql = `
      INSERT INTO tb_docall (number_doc, story, date_doc, byto, date_own, department, remark, company,  type)
      OUTPUT Inserted.id
      VALUES (@number_doc, @story, @date_doc, @byto, @date_own, @department, @remark, @company, 'sealcom')
    `;
  let datainternal = await query(sql, parameters);
  console.log('=>', datainternal);
  return datainternal;
};

module.exports.UpdatesealcomByID = async (id, body) => {
  let parameters = [
    { name: 'number_doc', sqltype: mssql.VarChar, value: body.number_doc },
    { name: 'story', sqltype: mssql.VarChar, value: body.story },
    { name: 'date_doc', sqltype: mssql.Date, value: body.date_doc },
    { name: 'byto', sqltype: mssql.VarChar, value: body.byto },
    { name: 'date_own', sqltype: mssql.Date, value: body.date_own },
    { name: 'department', sqltype: mssql.VarChar, value: body.department },
    { name: 'remark', sqltype: mssql.VarChar, value: body.remark },
    { name: 'company', sqltype: mssql.VarChar, value: body.company },
    { name: 'id', sqltype: mssql.Int, value: id },
  ];

  let sql = `
        UPDATE tb_docall SET 
        number_doc = @number_doc,
        story = @story,
        date_doc = @date_doc,
        byto = @byto,
        date_own = @date_own,
        department = @department,
        remark = @remark,
        company = @company
        OUTPUT INSERTED.*
        WHERE id = @id
    `;
  let update = await query(sql, parameters);
  console.log(update);
  return update;
};

module.exports.GetsealcomID = async (id) => {
  let parameters = [{ name: 'id', sqltype: mssql.Int, value: id }];

  let sql = `
        SELECT id, number_doc, story, FORMAT(date_doc, 'yyyy-MM-dd') as date_doc,  byto,
        FORMAT(date_own, 'yyyy-MM-dd') as date_own, department, remark, company
        FROM tb_docall WHERE id = @id
    `;
  let user = await query(sql, parameters);
  return user;
};
