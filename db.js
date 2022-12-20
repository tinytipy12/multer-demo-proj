var multer = require('multer')

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