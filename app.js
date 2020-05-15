//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hey Felaas!! sup?? tibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
let arraypost = [];
let ans = 0;
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// function new1() {
//     for (var i = 0; i < arraypost.length; i++)
//         console.log(arraypost[i])
// }
app.get("/posts/:topics", function(req, res) {
    //console.log(req.params.topics)
    //new1();
    for (var i = 0; i < arraypost.length; i++) { if (_.lowerCase(arraypost[i].posttitle) === _.lowerCase(req.params.topics)) { ans++; break } }
    if (ans === 1) {
        res.render("post", { title: arraypost[i].posttitle, content: arraypost[i].postbody })
        ans = 0;
    } else res.render("error")
})

app.get("/", function(req, res) {
    res.render("home", { h1: homeStartingContent, newpost: arraypost });
})

app.get("/about", function(req, res) {
    res.render("about", { h2: aboutContent })
})
app.get("/contact", function(req, res) {
    res.render("contact", { h3: contactContent })
})
app.get("/compose", function(req, res) {
    res.render("compose")
})

app.post("/", function(req, res) {
    const post = {
        posttitle: req.body.posttitle,
        postbody: req.body.postbody
    }
    arraypost.push(post);
    res.redirect("/")

})
app.listen(process.env.PORT||8100, function() {
    console.log("READy!!");
});