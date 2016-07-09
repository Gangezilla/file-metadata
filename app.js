var express=require('express');
var app=new express();

app.set('port', (process.env.PORT || 8080));
app.listen(app.get('port'), function() {
    console.log("Listening on " + app.get('port') + ".");
});

app.get("/", function(req,res) {
	res.send("<h1> this is a test to make sure this deploys");
});