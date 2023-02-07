const query = require('./database');
const mssql = require('mssql');

module.exports.Getdocmeet = async () => {
  let parameters = [];
  let sql = `
    SELECT id, company, FORMAT(year_doc, 'yyyy') as year_doc, 
    type_doc, no_meet, FORMAT(date_doc, 'yyyy-MM-dd') as date_doc, 
    datetime_meet, location_meet, image
    FROM tb_docall
    WHERE type = 'docmeet'
    `;
  let datainternal = await query(sql, parameters);
  return datainternal;
};

module.exports.Createdocmeet = async (body) => {
  //   let timchang =
  //     new Date().getHours() +
  //     ':' +
  //     new Date().getMinutes() +
  //     ':' +
  //     +new Date().getSeconds();
  //   console.log('tokota', timchang);

  let parameters = [
    { name: 'company', sqltype: mssql.VarChar, value: body.company },
    { name: 'year_doc', sqltype: mssql.Date, value: body.year_doc },
    { name: 'type_doc', sqltype: mssql.VarChar, value: body.type_doc },
    { name: 'no_meet', sqltype: mssql.VarChar, value: body.no_meet },
    { name: 'date_doc', sqltype: mssql.Date, value: body.date_doc },
    { name: 'datetime_meet', sqltype: mssql.Text, value: body.datetime_meet },
    {
      name: 'location_meet',
      sqltype: mssql.VarChar,
      value: body.location_meet,
    },
    { name: 'image', sqltype: mssql.VarChar, value: body.image },
  ];
  // console.log(body)
  let sql = `
        INSERT INTO tb_docall (company, year_doc, type_doc, no_meet, date_doc, datetime_meet, location_meet, image, type)
        OUTPUT Inserted.id
        VALUES (@company, @year_doc, @type_doc, @no_meet, @date_doc, @datetime_meet, @location_meet, @image, 'docmeet')
    `;
  let datainternal = await query(sql, parameters);
  console.log('=>', datainternal);
  return datainternal;
};

module.exports.UpdatedocmeetByID = async (id, body) => {
  let parameters = [
    { name: 'company', sqltype: mssql.VarChar, value: body.company },
    { name: 'year_doc', sqltype: mssql.Date, value: body.year_doc },
    { name: 'type_doc', sqltype: mssql.VarChar, value: body.type_doc },
    { name: 'no_meet', sqltype: mssql.VarChar, value: body.no_meet },
    { name: 'date_doc', sqltype: mssql.Date, value: body.date_doc },
    { name: 'datetime_meet', sqltype: mssql.Text, value: body.datetime_meet },
    {
      name: 'location_meet',
      sqltype: mssql.VarChar,
      value: body.location_meet,
    },
    { name: 'image', sqltype: mssql.VarChar, value: body.image },
    { name: 'id', sqltype: mssql.Int, value: id },
  ];

  let sql = `
        UPDATE tb_docall SET 
        company = @company,
        year_doc = @year_doc,
        type_doc = @type_doc,
        no_meet = @no_meet,
        date_doc = @date_doc,
        datetime_meet = @datetime_meet,
        location_meet = @location_meet,
        image = @image
        OUTPUT INSERTED.*
        WHERE id = @id
    `;
  let update = await query(sql, parameters);
  console.log(update);
  return update;
};

module.exports.GetdocmeetID = async (id) => {
  let parameters = [{ name: 'id', sqltype: mssql.Int, value: id }];

  let sql = `
        SELECT id, company, FORMAT(year_doc, 'yyyy') as year_doc, 
        type_doc, no_meet, FORMAT(date_doc, 'yyyy-MM-dd') as date_doc,
        datetime_meet, location_meet, image, type
        FROM tb_docall WHERE id = @id
    `;
  let user = await query(sql, parameters);
  return user;
};
