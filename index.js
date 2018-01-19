var express = require("express"),
		app = express(),
		bodyParser = require("body-parser"),
		mongoose = require("mongoose");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
mongoose.connect("mongodb://localhost/blogsite");

///////////////
// MODEL SETUP
///////////////
var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: 
		{type: Date, default: Date.now},
});

var Blog = mongoose.model("Blog", blogSchema);

///////////
// ROUTES
///////////

app.get("/", function(req, res) {
	res.redirect("/blogs");
});

// INDEX route
app.get("/blogs", function(req, res) {
	Blog.find({}, function(err, blogs) {
		if(err) {
			console.log(error);
		} else {
			res.render("index", {blogs: blogs});
		}
	})
});

// NEW route
app.get("/blogs/new", function(req, res) {
	res.render("new");
});


// CREATE route
app.post("/blogs", function(req,res) {
	Blog.create(req.body.blog, function(err, newBlog) {
		if(err) {
			res.render("new");
		} else {
			res.redirect("/blogs");
		}
	});
});

// SHOW route
app.get("/blogs/:id", function(req, res) {
	Blog.findById(req.params.id, function(err, foundBlog) {
		if(err) {
			redirect("/blogs");
		} else {
			res.render("show", {blog: foundBlog});
		}
	});
});







app.listen(3000, function() {
	console.log("working");
})