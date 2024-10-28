const express = require("express");
const fs = require("fs/promises");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await fs.readFile("./data/patients.json", "utf8");
    const patients = JSON.parse(data);
    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve patients" });
  }
});

module.exports = router;
