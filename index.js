var express = require('express')
var app = express()
var multer = require('multer')

app.set('view engine', 'ejs')
app.set('views', './views')

app.listen(3000, function(){
    console.log('connect thanh cong')
})

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
app.post('/multer', upload.single('file'), function(req, res){
    console.log(req.file)
    res.send("upload file thanh cong")
})

//Xử lí dưới database
const sql = require('mssql/msnodesqlv8')
const pool = new sql.ConnectionPool({
    database: 'dMulter',
    server: 'DESKTOP-46SSF4D\\SQLEXPRESS',
    driver: 'msnodesqlv8',
    options: {
        trustedConnection: true
    },
})



app.get('/', function(req, res){
    res.render('form')
})
