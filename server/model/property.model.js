const query = require('./database');
const mssql = require('mssql');

module.exports.Getproperty = async () => {
  let parameters = [];
  let sql = `
    SELECT id, company, type_property, location_meet, property_no, area, mortgage,
    mortgage_agent, image, remark
    FROM tb_docall
    WHERE type = 'property'
    `;
  let datainternal = await query(sql, parameters);
  return datainternal;
};

module.exports.Createproperty = async (body) => {
  let parameters = [
    { name: 'company', sqltype: mssql.VarChar, value: body.company },
    {
      name: 'type_property',
      sqltype: mssql.VarChar,
      value: body.type_property,
    },
    {
      name: 'location_meet',
      sqltype: mssql.VarChar,
      value: body.location_meet,
    },
    { name: 'property_no', sqltype: mssql.VarChar, value: body.property_no },
    { name: 'area', sqltype: mssql.VarChar, value: body.area },
    { name: 'mortgage', sqltype: mssql.VarChar, value: body.mortgage },
    {
      name: 'mortgage_agent',
      sqltype: mssql.VarChar,
      value: body.mortgage_agent,
    },
    { name: 'image', sqltype: mssql.VarChar, value: body.image },
    { name: 'remark', sqltype: mssql.VarChar, value: body.remark },
  ];
  // console.log(body)
  let sql = `
        INSERT INTO tb_docall (company, type_property, location_meet, property_no, area, mortgage, mortgage_agent, image, remark, type)
        OUTPUT Inserted.id
        VALUES (@company, @type_property, @location_meet, @property_no, @area, @mortgage, @mortgage_agent, @image, @remark, 'property')
    `;
  let datainternal = await query(sql, parameters);
  console.log('=>', datainternal);
  return datainternal;
};

module.exports.UpdatepropertyByID = async (id, body) => {
  let parameters = [
    { name: 'company', sqltype: mssql.VarChar, value: body.company },
    {
      name: 'type_property',
      sqltype: mssql.VarChar,
      value: body.type_property,
    },
    {
      name: 'location_meet',
      sqltype: mssql.VarChar,
      value: body.location_meet,
    },
    { name: 'property_no', sqltype: mssql.VarChar, value: body.property_no },
    { name: 'area', sqltype: mssql.VarChar, value: body.area },
    { name: 'mortgage', sqltype: mssql.VarChar, value: body.mortgage },
    {
      name: 'mortgage_agent',
      sqltype: mssql.VarChar,
      value: body.mortgage_agent,
    },
    { name: 'image', sqltype: mssql.VarChar, value: body.image },
    { name: 'remark', sqltype: mssql.VarChar, value: body.remark },
    { name: 'id', sqltype: mssql.Int, value: id },
  ];

  let sql = `
        UPDATE tb_docall SET 
        company = @company,
        type_property = @type_property,
        location_meet = @location_meet,
        property_no = @property_no,
        area = @area,
        mortgage = @mortgage,
        mortgage_agent = @mortgage_agent,
        image = @image,
        remark = @remark
        OUTPUT INSERTED.*
        WHERE id = @id
    `;
  let update = await query(sql, parameters);
  console.log(update);
  return update;
};

module.exports.GetpropertyID = async (id) => {
  let parameters = [{ name: 'id', sqltype: mssql.Int, value: id }];

  let sql = `
        SELECT id, company, type_property, location_meet, property_no, area, mortgage,
        mortgage_agent, image, remark
        FROM tb_docall WHERE id = @id
    `;
  let user = await query(sql, parameters);
  return user;
};
