import express from "express";
import FormData from "../models/FormData.js";

const router = express.Router();

// POST route to save form data
router.post("/", async (req, res) => {
  try {
    const { name, dob, message } = req.body;
    const newForm = new FormData({ name, dob, message });
    await newForm.save();
    res.status(201).json({ message: "Form data saved successfully!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET route to fetch all form data
router.get("/", async (req, res) => {
  try {
    const data = await FormData.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
