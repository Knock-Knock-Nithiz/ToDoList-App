let express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
let sanitizeHTML = require("sanitize-html");

let app = express();

let db;
app.use(express.static("public"));

let connectionString =
  "mongodb+srv://nithyananthankrishnan:babu123@cluster0.4ovo0ux.mongodb.net/ToDoist?retryWrites=true&w=majority&appName=Cluster0";

MongoClient.connect(connectionString)
  .then((client) => {
    db = client.db();
    console.log("Database connected successfully.");

    // Start server
    return app.listen(3000);
  })
  .then(() => {
    console.log("Server listening on port 3000");
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

function passwordProtection(req, res, next) {
  res.set("WWW-Authenticate", 'Basic realm="Simple Todo App"');
  console.log(req.headers.authorization);
  if (req.headers.authorization == "Basic bml0aGk6bml0aGk=") {
    next();
  } else {
    res.status(401).send("authentication required");
  }
}
app.use(passwordProtection);
app.get("/", passwordProtection, function (req, res) {
  db.collection("items")
    .find()
    .toArray()
    .then((items) => {
      res.send(`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Simple To-Do App</title>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
</head>
<body>
  <div class="container">
    <h1 class="display-4 text-center py-1">To-Do App!!!</h1>
    
    <div class="jumbotron p-3 shadow-sm">
      <form id="create-form" action="/create-item" method="POST">
        <div class="d-flex align-items-center">
          <input id="create-field" name="item" autofocus autocomplete="off" class="form-control mr-3" type="text" style="flex: 1;">
          <div class="d-grid gap-2 d-md-block">
            <button class="btn btn-primary">Add New Item</button>
            <button class="btn btn-primary">Create</button>
          </div>
        </div>
      </form>
    </div>
    
    <ul id="item-list" class="list-group pb-5">
    
    </ul>
  </div>
  <script>
  let items=${JSON.stringify(items)}
  </script>
  <script src="https://cdn.jsdelivr.net/npm/axios@1.6.7/dist/axios.min.js"></script>
  <script src="/browser.js"></script>
</body>
</html> `);
    });
});

app.post("/create-item", function (req, res) {
  let safeText = sanitizeHTML(req.body.text, {
    allowedTags: [],
    allowedAttributes: {},
  });
  db.collection("items")
    .insertOne({ text: safeText })
    .then((result) => {
      console.log("Insert result:", result);
      if (result.insertedId) {
        res.json({ _id: result.insertedId, text: req.body.item });
      } else {
        res
          .status(500)
          .send("Unexpected result structure from insert operation.");
      }
    })
    .catch((err) => {
      console.error("Error inserting item:", err);
      res.status(500).send("Error inserting item.");
    });
});

app.post("/update-item", function (req, res) {
  let safeText = sanitizeHTML(req.body.text, {
    allowedTags: [],
    allowedAttributes: {},
  });
  const { ObjectId } = require("mongodb");
  const itemId = new ObjectId(req.body.id);
  db.collection("items")
    .findOneAndUpdate({ _id: itemId }, { $set: { text: safeText } })
    .then(() => {
      res.send("Success");
    });
});

app.post("/delete-item", function (req, res) {
  db.collection("items")
    .deleteOne({ _id: new ObjectId(req.body.id) })
    .then(() => {
      res.send("success");
    });
});
