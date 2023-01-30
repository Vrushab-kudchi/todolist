const express = require("express");
const ejs = require("ejs");
const app = express();
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js")
const mongoose = require("mongoose");

mongoose.set('strictQuery', true);


mongoose.connect('mongodb+srv://Vrushab:cA7zekXqSBEzlR3c@cluster0.s387cfq.mongodb.net/todolistDB')


app.set("view engine", "ejs");

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));


let itemschema = {
	item: String
}

let todolist = mongoose.model("list", itemschema);

const item1 = new todolist({
	item: "Welcome to my Application"
});

const item2 = new todolist({
	item: "Press the + to add your List"
});

const item3 = new todolist({
	item: "<-- click here to delete this list"
});

const defualtitem = [item1, item2, item3]



let items = [];


app.get("/", function (req, res) {
	// get date
	let day = date.getDate();

	// database connected to show items on site
	todolist.find({}, function (err, data) {

		if (data.length === 0) {
			todolist.insertMany(defualtitem, function (err) {
				if (err) {
					console.log(err);
				}
				else {
					console.log("default List Added")
					res.redirect('/')
				}
			})
		}
		else {
			res.render("todo", { todaysday: day, newlist: data });
		}

	})

});

app.post("/", function (req, res) {

	let item = req.body.todoinput;
	let data = new todolist({
		item: item
	});
	data.save().then(function () {
		res.redirect('/')
	});

});

app.post("/delete", function (req, res) {
	let checkID = req.body.checked;
	todolist.deleteOne({ _id: checkID }, function (err) {
		if (err) {
			console.log(err)
		}
		else {
			console.log("Deleted From Database")
			res.redirect("/")
		}
	})
})

app.get("/:customList", function (req, res) {

	console.log(req.params.customList);
})

app.listen(process.env.PORT || 3000, function () {
	console.log("Server Running");
});
