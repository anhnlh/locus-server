require("dotenv").config();
const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB connection
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const database = client.db("locus");
const collection = database.collection("locations");

// Routes
app.post("/uploadLocation", async (req, res) => {
  try {
    const newItem = req.body;
    const result = await collection.insertOne(newItem);
    res.status(201).send(result);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});

app.get("/getAllLocations", async (_, res) => {
  try {
    const locations = await collection.find().toArray();
    res.status(200).json(locations);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

app.post("/upsertLocation", async (req, res) => {
  try {
    const { timestamp, updatedLocation } = req.body;
    const result = await collection.updateOne(
      { timestamp: timestamp },
      { $set: updatedLocation },
      { upsert: true }
    );
    if (result.matchedCount === 0) {
      if (result.ok) {
        res.status(201).send("Location created successfully");
      } else {
        res.status(404).send("Location not found");
      }
    } else {
      res.status(200).send("Location updated successfully");
    }
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
