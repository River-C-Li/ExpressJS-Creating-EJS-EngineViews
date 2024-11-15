const express = require("express");
const app = express();
const port = 3000;
// serve static files from the styles directory
app.use(express.static("./styles"));

// require the filesystem module
const fs = require("fs");
// define the template engine
// app.engine("perscholas", (filePath, options, callback) => {
  app.engine("ejs", (filePath, options, callback) => {
  fs.readFile(filePath, (err, content) => {
    if (err) return callback(err);

    // Here, we take the content of the template file,
    // convert it to a string, and replace sections of
    // it with the values being passed to the engine.
    const rendered = content
      .toString()
      .replaceAll("#title#", `${options.title}`)
      .replace("#content#", `${options.content}`);
    return callback(null, rendered);
  });
});

app.set("views", "./views"); // specify the views directory
// app.set("view engine", "perscholas"); // register the template engine
app.set('view engine', 'ejs'); // Set the view engine to EJS [2, 3, 5]

// // Route for the homepage
app.get("/", (req, res) => {
  const options = {
    title: "Offers",
    content: "here is details.",
  };
res.render('home', options); // Render the 'home.ejs' template [2, 3, 5]
  // res.render("index", options);
});

// // Route for the about page
app.get('/about', (req, res) => {
    res.render('about'); // Render the 'about.ejs' template [2, 3, 5]
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}.`);
});
// app.listen(3000, () => console.log('Server listening on port 3000'));
