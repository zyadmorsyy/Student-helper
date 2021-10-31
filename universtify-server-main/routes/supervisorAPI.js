const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();
//GET all supervisors
router.get("/supervisors", async (req, res) => {
  try {
    const supervisors = await prisma.supervisor.findMany({
      orderBy: [{ fname: "desc" }],
    });
    res.json(supervisors);
  } catch (err) {
    res.json({ error: "wrong data", errMsg: err.message });
  }
});

//GET supervisor by id
router.get("/supervisor/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const supervisor = await prisma.supervisor.findUnique({
      where: { id: Number(id) },
      include: {
        students: true,
        notifications: { orderBy: [{ createdAt: "desc" }] },
      },
    });
    res.json(supervisor);
  } catch (err) {
    res.json({ error: "wrong data", errMsg: err.message });
  }
});

//creat supervisor
router.post("/supervisor", async (req, res) => {
  const { fname, lname, gender, password, email, coordinatorId } = req.body;
  try {
    const createSupervisor = await prisma.supervisor.create({
      data: {
        fname,
        lname,
        gender,
        password,
        email,
        coordinatorId: Number(coordinatorId),
      },
    });
    res.json(createSupervisor);
  } catch (err) {
    res.json({ error: "wrong data", errMsg: err.message });
  }
});

//UPDATE password of a supervisor
router.put("/supervisor/:id/password", async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  try {
    const updatedSupervisor = await prisma.supervisor.update({
      where: { id: Number(id) || undefined },
      data: { password: password || undefined },
    });
    res.json(updatedSupervisor);
  } catch (error) {
    res.json({
      error: `supervisor with ID ${id} does not exist in the database`,
    });
  }
});

module.exports = router;
