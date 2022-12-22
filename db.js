//Xử lí dưới database
const sql = require('mssql/msnodesqlv8')

const config = {
    server: 'DESKTOP-46SSF4D\\SQLEXPRESS',
    database: 'dMulter',
    driver: 'msnodesqlv8',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
     },
    options: {
        trustedConnection: true,
    },
    requestTimeout: 300000,
}

sql.on('error', err => {
    console.log(err.message)
})


sql.connect(config).then(pool => {
    // Query   
    return pool.request()
        .query('select * from [demoUpload]')
}).then(result => {
    console.dir(result.recordset[0])
}).catch(err => {
    console.log(err)
});