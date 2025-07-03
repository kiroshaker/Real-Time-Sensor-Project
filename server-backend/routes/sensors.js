const express = require("express");
const router = express.Router();
const Sensor = require("../models/schema");


router.get("/", async (req, res) => {
    const timeLimit = new Date(req.query.since);
    const query = {};
    try {
        if(timeLimit && !isNaN(timeLimit)) {
            query.timestamp = { $gte: new Date(timeLimit) };
        }

        const results = await Sensor.find(query).sort({ timestamp: 1 }).exec();
        return res.json(results);
    } catch(error) {
        console.error("Error fetching sensor data:", error);
        return res.status(500).json({ error: "Failed to fetch sensor data" });
    }
});

router.get("/latest", async (req, res) => {
    try {
        const latest = await Sensor.find().sort({ timestamp: -1}).limit(1).exec();
    if(latest.length === 0) {
        return res.status(204).send();
    } return res.json(latest[0]);
    } catch(error) {
        console.error("Error fetching sensor data:", error);
        return res.status(500).json({ error: "Failed to fetch sensor data" });
    }
});

router.get("/count", async (req, res) =>{
    try {
        const count = await Sensor.countDocuments();
        return res.json({ count });
    } catch(error) {
        return res.status(500).json({ error: "Failed to fetch count" });
    }
});

module.exports = router;