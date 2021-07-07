const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

// Load environment variables
dotenv.config({path: './config/config.env'});

const connectDB = require('./config/db');

// Connect to database
connectDB();

// Route files
const search = require('./routes/search');

const SearchM = require('./models/Search');

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(express.static("public"));

// Body parser
app.use(express.json());

// Mount routers
app.use('/search_engine', search);

app.route("/")
.get((req, res) => {
  res.render("search");
})
.post((req, res) => {
  let hint = "";
  let response = "";
  let searchQ = req.body.query.toLowerCase();
  let limit = 1;

  if (searchQ.length > 0) {
    SearchM.find(function(err, results) {
      if (err) {
        console.log(err);
      } else {
        results.forEach(function(qResult) {
          if (qResult.title.indexOf(searchQ) != -1) {
            if (hint === "") {
              hint = "<a href='" + qResult.url + "' target='_blank'>" + qResult.title + "</a>";
            } else if (limit < 5) {
              hint = hint + "<br/> <a href='" + qResult.url +"' target='_blank'>" + qResult.title + "</a>";
              limit++;
            }
          }
        })
      }
      if (hint === "") {
        response = "no response";
      } else {
        response = hint;
      }
      res.send({response: response});
    })
  }
});

app.listen(process.env.PORT, console.log(`Server running on port ${process.env.PORT}`));