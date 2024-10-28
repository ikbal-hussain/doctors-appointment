const express = require("express");
const fs = require("fs/promises");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await fs.readFile("./data/doctors.json", "utf8");
    const doctors = JSON.parse(data);
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve doctors" });
  }
});

module.exports = router;
