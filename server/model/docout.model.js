const query = require('./database');
const mssql = require('mssql');

module.exports.Getdocout = async () => {
  let parameters = [];
  let sql = `
    SELECT id, company, department, story, FORMAT(date_doc, 'yyyy-MM-dd') as date_doc,
    FORMAT(date_recive, 'yyyy-MM-dd') as date_recive, respond, location_meet, remark
    FROM tb_docall
    WHERE type = 'docout'
    `;
  let datainternal = await query(sql, parameters);
  return datainternal;
};

module.exports.Createdocout = async (body) => {
  let parameters = [
    { name: 'company', sqltype: mssql.VarChar, value: body.company },
    { name: 'department', sqltype: mssql.VarChar, value: body.department },
    { name: 'story', sqltype: mssql.VarChar, value: body.story },
    { name: 'date_doc', sqltype: mssql.Date, value: body.date_doc },
    { name: 'date_recive', sqltype: mssql.Date, value: body.date_recive },
    { name: 'respond', sqltype: mssql.VarChar, value: body.respond },
    {
      name: 'location_meet',
      sqltype: mssql.VarChar,
      value: body.location_meet,
    },
    { name: 'remark', sqltype: mssql.VarChar, value: body.remark },
  ];
  // console.log(body)
  let sql = `
        INSERT INTO tb_docall (company, department, story, date_doc, date_recive, respond, location_meet, remark, type)
        OUTPUT Inserted.id
        VALUES (@company, @department, @story, @date_doc, @date_recive, @respond, @location_meet, @remark, 'docout')
    `;
  let datainternal = await query(sql, parameters);
  console.log('=>', datainternal);
  return datainternal;
};

module.exports.UpdatedocoutByID = async (id, body) => {
  let parameters = [
    { name: 'company', sqltype: mssql.VarChar, value: body.company },
    { name: 'department', sqltype: mssql.VarChar, value: body.department },
    { name: 'story', sqltype: mssql.VarChar, value: body.story },
    { name: 'date_doc', sqltype: mssql.Date, value: body.date_doc },
    { name: 'date_recive', sqltype: mssql.Date, value: body.date_recive },
    { name: 'respond', sqltype: mssql.VarChar, value: body.respond },
    {
      name: 'location_meet',
      sqltype: mssql.VarChar,
      value: body.location_meet,
    },
    { name: 'remark', sqltype: mssql.VarChar, value: body.remark },
    { name: 'id', sqltype: mssql.Int, value: id },
  ];

  let sql = `
        UPDATE tb_docall SET 
        company = @company,
        department = @department,
        story = @story,
        date_doc = @date_doc,
        date_recive = @date_recive,
        respond = @respond,
        location_meet = @location_meet,
        remark = @remark
        OUTPUT INSERTED.*
        WHERE id = @id
    `;
  let update = await query(sql, parameters);
  console.log(update);
  return update;
};

module.exports.GetdocoutID = async (id) => {
  let parameters = [{ name: 'id', sqltype: mssql.Int, value: id }];

  let sql = `
        SELECT id, company, department, story, FORMAT(date_doc, 'yyyy-MM-dd') as date_doc,
        FORMAT(date_recive, 'yyyy-MM-dd') as date_recive, respond, location_meet, remark
        FROM tb_docall WHERE id = @id
    `;
  let user = await query(sql, parameters);
  return user;
};
