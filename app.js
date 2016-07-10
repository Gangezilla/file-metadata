var express=require('express');
var app=new express();
var multer=require('multer');

var upload=(multer({dest:'./uploads/'}));
var fileData;

app.set('port', (process.env.PORT || 8080));
app.listen(app.get('port'), function() {
    console.log("Listening on " + app.get('port') + ".");
});

app.set('view engine', 'ejs');
app.set('views', __dirname + '/templates');

app.get("/", function(req,res) {
	res.render('index');
});

app.post('/', multer({
	 dest: './uploads/',
	 limits: {fileSize:5000000, files:1}
	}).single('fileUpload'), function(req,res){
	fileData=req.file;
	res.json({size: fileData.size});
});

//need to handle large file uploads, throw back an error instead of that screen, maybe?
//also, probs dont want to store every single file on here. so, probably get the data, send filesize back, then remove the file from the  uploads folder once we're done with it.

// User Story: I can submit a FormData object that includes a file upload. CHECK

// User Story: When I submit something, I will receive the file size in bytes within the JSON response. CHECK.

//Personal Story: Files will be removed after download so as to prevent big crazy server crashes.

//Personal Story: Display an error, and allow a user to upload a smaller file, if the file size is too large.

//little html page with an upload button, that when yo