const { MongoClient, ServerApiVersion } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8000;
require("dotenv").config();

//midalware
app.use(cors());
app.use(express.json());

console.log(process.env.DB_PASS);

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.z7kch.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   console.log("Hiting the database");
//   client.close();
// });
async function run() {
  try {
    await client.connect();
    const database = client.db("learningManagement");
    const blogsCollection = database.collection("blogs");
    const instructorCollection = database.collection("instructor");
    const popularCoursesCollection = database.collection("popularCourses");
    const reviewsCollection = database.collection("reviews");

    // GET API ALL ORDERS
    app.get("/all-blogs", async (req, res) => {
      const cursor = blogsCollection.find({});
      const orders = await cursor.toArray();
      res.send(orders);
    });
    // GET SINGLE PRODUCT
    app.get("/all-blog/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const blogs = await blogsCollection.findOne(query);
      res.json(blogs);
    });

    // GET API ALL INSTRUCTOR
    app.get("/all-instructor", async (req, res) => {
      const cursor = instructorCollection.find({});
      const orders = await cursor.toArray();
      res.send(orders);
    });
    // GET API ALL POPULAR COURSES
    app.get("/all-popCourses", async (req, res) => {
      const cursor = popularCoursesCollection.find({});
      const orders = await cursor.toArray();
      res.send(orders);
    });

    // GET SINGLE PRODUCT
    app.get("/all-popCourse/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const course = await popularCoursesCollection.findOne(query);
      res.json(course);
    });

    // GET API ALL Reviews
    app.get("/all-Reviews", async (req, res) => {
      const cursor = reviewsCollection.find({});
      const orders = await cursor.toArray();
      res.send(orders);
    });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);
app.get("/", (req, res) => {
  res.send("Running my lms");
});

app.listen(port, () => {
  console.log("Khul ja sim sim", port);
});
