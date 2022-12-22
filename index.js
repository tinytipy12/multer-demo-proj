var express = require('express')
var app = express()
var multer = require('multer')

app.set('view engine', 'ejs')
app.set('views', './views')

app.listen(3000, function(){
    console.log('connect thanh cong')
})

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
    console.dir(result)
    console.log("connect toi db thanh cong!")
}).catch(err => {
    console.log(err)
});



//Khai báo nơi lưu trữ file
var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads') //Kiểm tra
    },
    filename: function(req, file, cb){
        cb(null, file.originalname) //Kiểm tra
    }
})

//Khai báo biến upload
var upload = multer({storage: storage})

//Khai báo tải file lên server
app.post('/', upload.single('file'), function(req, res){
    console.log(req.file)
    res.send("upload file thanh cong")

    sql.connect(config).then(pool => {
        // Query   
        return pool.request()
            .input('id', sql.Char(5), req.body.text)
            .input('img', sql.VarChar(50), req.file.originalname)
            .query(`insert into [demoUpload] (ID, img) values (@id, @img)`)
    }).then(result => {
        console.log("them thanh cong")
    }).catch(err => {
        console.log(err)
    });   
})

app.get('/', function(req, res){
    res.render('form')
})
