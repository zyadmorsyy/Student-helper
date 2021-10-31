const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

//Create notification for student
router.post("/student/:id/notification", async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  try {
    const createNotification = await prisma.notifications.create({
      data: {
        studentID: Number(id),
        data,
      },
    });
    res.json(createNotification);
  } catch (err) {
    res.json({ error: "wrong data", errMsg: err.message });
  }
});

//Create notification for supervisor
router.post("/supervisor/:id/notification", async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  try {
    const createNotification = await prisma.notifications.create({
      data: {
        supervisorId: Number(id),
        data,
      },
    });
    res.json(createNotification);
  } catch (err) {
    res.json({ error: "wrong data", errMsg: err.message });
  }
});

//GET all notifications for student
router.get("/student/:id/notifications", async (req, res) => {
  const { id } = req.params;
  try {
    const notifications = await prisma.student.findMany({
      where: { studentID: Number(id) },
    });
    res.json(notifications);
  } catch (err) {
    res.json({ error: "wrong data", errMsg: err.message });
  }
});

//GET all notifications for student
router.get("/supervisor/:id/notifications", async (req, res) => {
  const { id } = req.params;
  try {
    const notifications = await prisma.student.findMany({
      where: { studentID: Number(id) },
    });
    res.json(notifications);
  } catch (err) {
    res.json({ error: "wrong data", errMsg: err.message });
  }
});

//UPDATE notification status
router.put("/notification/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const updatedNotification = await prisma.notifications.update({
      where: { id: Number(id) || undefined },
      data: { status: Number(status) || undefined },
    });
    res.json(updatedNotification);
  } catch (error) {
    res.json({
      error: `Notification with ID ${id} does not exist in the database`,
    });
  }
});

module.exports = router;
