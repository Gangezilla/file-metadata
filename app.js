var express=require('express');
var app=new express();
var multer=require('multer');
var fs=require('fs');
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
	console.log(fileData);
	res.json({size: fileData.size});
	//you'd just delete everything in the folder, i'd say.
	fs.unlink(fileData.path, (err) => {
  	if (err) throw err;
  	console.log('successfully deleted '+fileData.path);
});
});

// User Story: I can submit a FormData object that includes a file upload. CHECK

// User Story: When I submit something, I will receive the file size in bytes within the JSON response. CHECK.

//Personal Story: Files will be removed after download so as to prevent big crazy server crashes (although this is prevented already by limiting file. CHECK