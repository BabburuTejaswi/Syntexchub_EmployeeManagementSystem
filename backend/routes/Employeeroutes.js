const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");

// CREATE
router.post("/", async (req, res) => {
  const emp = new Employee(req.body);
  await emp.save();
  res.json(emp);
});

// READ
router.get("/", async (req, res) => {
  const data = await Employee.find();
  res.json(data);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const updated = await Employee.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;