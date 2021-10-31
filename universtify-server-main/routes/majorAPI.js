const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

//GET major by id
router.get("/majors", async (req, res) => {
  try {
    const major = await prisma.major.findMany();
    res.json(major);
  } catch (err) {
    res.json({ error: "wrong data", errMsg: err.message });
  }
});

//creat major
router.post("/major", async (req, res) => {
  const { code, name } = req.body;
  try {
    const createmajor = await prisma.major.create({
      data: { code, name },
    });
    res.json(createmajor);
  } catch (err) {
    res.json({ error: "wrong data", errMsg: err.message });
  }
});

module.exports = router;
