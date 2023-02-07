const query = require('./database');
const mssql = require('mssql');

module.exports.Getmanual = async () => {
  let parameters = [];
  let sql = `
    SELECT id, number_doc, company, department, FORMAT(year_doc, 'yyyy') as year_doc, story, no_meet,
    FORMAT(date_doc, 'yyyy-MM-dd') as date_doc, FORMAT(date_approve, 'yyyy-MM-dd') as date_approve
    FROM tb_docall
    WHERE type = 'manual'
    `;
  let datainternal = await query(sql, parameters);
  return datainternal;
};

module.exports.Createmanual = async (body) => {
  let parameters = [
    { name: 'number_doc', sqltype: mssql.VarChar, value: body.number_doc },
    { name: 'company', sqltype: mssql.VarChar, value: body.company },
    { name: 'department', sqltype: mssql.VarChar, value: body.department },
    { name: 'year_doc', sqltype: mssql.Date, value: body.year_doc },
    { name: 'story', sqltype: mssql.VarChar, value: body.story },
    { name: 'no_meet', sqltype: mssql.VarChar, value: body.no_meet },
    { name: 'date_doc', sqltype: mssql.Date, value: body.date_doc },
    { name: 'date_approve', sqltype: mssql.Date, value: body.date_approve },
  ];
  // console.log(body)
  let sql = `
        INSERT INTO tb_docall (number_doc, company, department, year_doc, story, no_meet, date_doc, date_approve, type)
        OUTPUT Inserted.id
        VALUES (@number_doc, @company, @department, @year_doc, @story, @no_meet, @date_doc, @date_approve, 'manual')
    `;
  let datainternal = await query(sql, parameters);
  console.log('=>', datainternal);
  return datainternal;
};

module.exports.UpdatemanualByID = async (id, body) => {
  let parameters = [
    { name: 'number_doc', sqltype: mssql.VarChar, value: body.number_doc },
    { name: 'company', sqltype: mssql.VarChar, value: body.company },
    { name: 'department', sqltype: mssql.VarChar, value: body.department },
    { name: 'year_doc', sqltype: mssql.Date, value: body.year_doc },
    { name: 'story', sqltype: mssql.VarChar, value: body.story },
    { name: 'no_meet', sqltype: mssql.VarChar, value: body.no_meet },
    { name: 'date_doc', sqltype: mssql.Date, value: body.date_doc },
    { name: 'date_approve', sqltype: mssql.Date, value: body.date_approve },
    { name: 'id', sqltype: mssql.Int, value: id },
  ];

  let sql = `
        UPDATE tb_docall SET 
        number_doc = @number_doc,
        company = @company,
        department = @department,
        year_doc = @year_doc,
        story = @story,
        no_meet = @no_meet,
        date_doc = @date_doc,
        date_approve = @date_approve
        OUTPUT INSERTED.*
        WHERE id = @id
    `;
  let update = await query(sql, parameters);
  console.log(update);
  return update;
};

module.exports.GetmanualID = async (id) => {
  let parameters = [{ name: 'id', sqltype: mssql.Int, value: id }];

  let sql = `
        SELECT id, number_doc, company, department, FORMAT(year_doc, 'yyyy') as year_doc, story, no_meet,
        FORMAT(date_doc, 'yyyy-MM-dd') as date_doc, FORMAT(date_approve, 'yyyy-MM-dd') as date_approve
        FROM tb_docall WHERE id = @id
    `;
  let user = await query(sql, parameters);
  return user;
};
