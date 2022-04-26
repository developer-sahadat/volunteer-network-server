const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.xjkn1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const collection = client.db("volunteerNetwork").collection("event");
    const orderCollection = client.db("volunteerNetwork").collection("order");

    // all event get api
    app.get("/event", async (req, res) => {
      const query = {};
      const cursor = collection.find(query);
      const event = await cursor.toArray();
      res.send(event);
    });

    // order details
    app.post("/order", async (req, res) => {
      const user = req.body;
      const result = await orderCollection.insertOne(user);
      res.send(result);
    });

    // order details get
    app.get("/order", async (req, res) => {
      const email = req.query.email;
      const query = { email };
      const cursor = orderCollection.find(query);
      const event = await cursor.toArray();
      res.send(event);
    });

    // delete api
    app.delete("/order/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await orderCollection.deleteOne(query);
      res.send(result);
    });
  } finally {
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("All Ok");
});

app.listen(port, () => {
  console.log(port);
});

//volunteer-network
//ws920q7Gr3CDGo1V
