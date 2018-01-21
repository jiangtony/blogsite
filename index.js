var express = require("express"),
		app = express(),
		bodyParser = require("body-parser"),
		mongoose = require("mongoose"),
		methodOverride = require("method-override"),
		expressSanitizer = require("express-sanitizer"),
		Blog = require("./models/blog");


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(expressSanitizer());
app.set("view engine", "ejs");
mongoose.connect("mongodb://localhost/blogsite");


///////////////
// ROUTES
///////////////

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
	request.body.blog.body = req.sanitize(request.body.blog.body);
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


// EDIT route
app.get("/blogs/:id/edit", function(req, res) {
	Blog.findById(req.params.id, function(err, foundBlog) {
		if(err) {
			res.redirect("/blogs");
		} else {
			res.render("edit", {blog: foundBlog});
		}
	})
});

// UPDATE route
app.put("/blogs/:id", function(req, res) {
	request.body.blog.body = req.sanitize(request.body.blog.body);
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog) {
		if(err) {
			res.redirect("/blogs");
		} else {
			res.redirect("/blogs/" + req.params.id);
		}
	});
});

// DESTROY route
app.delete("/blogs/:id", function(req, res) {
	Blog.findByIdAndRemove(req.params.id, function(err) {
		if(err) {
			res.redirect("/blogs");
		} else {
			res.redirect("/blogs");
		}
	});
});

app.listen(3000, function() {
	console.log("working");
})