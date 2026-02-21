const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const machines = [
  {
    id: 1,
    name: "Excavator ZX200",
    category: "Excavator",
    location: "Mumbai",
    price_per_day: 12000,
    available: true
  },
  {
    id: 2,
    name: "Hydraulic Crane 50T",
    category: "Crane",
    location: "Pune",
    price_per_day: 18000,
    available: false
  },
  {
    id: 3,
    name: "Backhoe Loader 3DX",
    category: "Loader",
    location: "Mumbai",
    price_per_day: 9000,
    available: true
  },
  {
    id: 4,
    name: "Crawler Crane 75T",
    category: "Crane",
    location: "Bangalore",
    price_per_day: 22000,
    available: true
  },
  {
    id: 5,
    name: "Mini Excavator 1.5T",
    category: "Excavator",
    location: "Pune",
    price_per_day: 7000,
    available: true
  }
];

app.get("/machines", (req, res) => {
  res.json(machines);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});