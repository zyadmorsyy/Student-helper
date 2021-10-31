const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();
//GET all coordinators
router.get("/coordinators", async (req, res) => {
  try {
    const coordinators = await prisma.coordinator.findMany({
      orderBy: [{ fname: "desc" }],
    });
    res.json(coordinators);
  } catch (err) {
    res.json({ error: "wrong data", errMsg: err.message });
  }
});

//GET coordinator by id
router.get("/coordinator/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const coordinator = await prisma.coordinator.findUnique({
      where: { id: Number(id) },
      include: {
        students: true,
        notifications: { orderBy: [{ createdAt: "desc" }] },
      },
    });
    res.json(coordinator);
  } catch (err) {
    res.json({ error: "wrong data", errMsg: err.message });
  }
});

//creat coordinator
router.post("/coordinator", async (req, res) => {
  const { fname, lname, gender, password, email } = req.body;
  try {
    const createcoordinator = await prisma.coordinator.create({
      data: {
        fname,
        lname,
        gender,
        password,
        email,
      },
    });
    res.json(createcoordinator);
  } catch (err) {
    res.json({ error: "wrong data", errMsg: err.message });
  }
});

//UPDATE password of a coordinator
router.put("/coordinator/:id/password", async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  try {
    const updatedcoordinator = await prisma.coordinator.update({
      where: { id: Number(id) || undefined },
      data: { password: password || undefined },
    });
    res.json(updatedcoordinator);
  } catch (error) {
    res.json({
      error: `coordinator with ID ${id} does not exist in the database`,
    });
  }
});

module.exports = router;
