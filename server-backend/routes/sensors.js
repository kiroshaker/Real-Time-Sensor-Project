const express = require("express");
const router = express.Router();
const Sensor = require("../models/schema");

router.get("/", async (req, res) => {
    const queryLimit = Number(req.query.limit);
    try {
        let query = Sensor.find().sort({ timestamp: -1});
        if(!isNaN(queryLimit) && queryLimit > 0) {
            query = query.limit(queryLimit);
        }
        const results = await query.exec();
        
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