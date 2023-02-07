const query = require("./database")
const mssql = require("mssql")

module.exports.reportInternal = async (year, month) => {
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
    FROM tb_internal_memo
    WHERE MONTH(date_doc) = @month
    AND YEAR(date_doc) = @year
    `;
    let user = await query(sql, parameters);
    return user;
}