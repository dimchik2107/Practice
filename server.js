var port = 3000;
var serverUrl = "localhost";


var http = require("http");
var path = require("path");  //указывает путь к файлу
var fs = require("fs");


console.log("Starting web server at " + serverUrl + ":" + port);


http.createServer( function(req, res) {


    var now = new Date();


    var filename = req.url || "index.html";
    var ext = path.extname(filename);        // расширение файла
    var localPath = __dirname;
    var validExtensions = {
        ".html" : "text/html",
        ".js": "application/javascript",
        ".css": "text/css",
        ".txt": "text/plain",
        ".jpg": "image/jpeg",
        ".gif": "image/gif",
        ".png": "image/png",
        ".ico": "image/png"
    };
    var isValidExt = validExtensions[ext];



    if (isValidExt) {                       //проверка расширения
        localPath += filename;


        fs.exists(localPath, function(exists) {
            if(exists) {
                console.log("Serving file: " + localPath);
                getFile(localPath, res, ext);
            } else {
                console.log("File not found: " + localPath);
            }
        });


    } else {
         console.log("Invalid file extension detected: " + ext)
         getFile(__dirname + '/index.html', res, 'text/html');
    }


}).listen(port, serverUrl);


function getFile(localPath, res, validExtensions) {
    fs.readFile(localPath, function(err, contents) {
        if(!err) {
            res.setHeader("Content-Length", contents.length); // устанавливает размер заголовка как размер текста
            res.statusCode = 200; // запрос выполнен успешно
            res.end(contents);
        } else {
            res.writeHead(500); //сервер столкнулся с ошибкой
            res.end();
        }
    });
}
