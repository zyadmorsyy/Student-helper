const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

//GET all semesters for One student
router.get("/student/:id/semesters", async (req, res) => {
  const { id } = req.params;
  try {
    const semesters = await prisma.studentSemester.findMany({
      where: {
        studentId: Number(id),
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.json(semesters);
  } catch (err) {
    res.json({ error: "wrong data", errMsg: err.message });
  }
});

router.get("/student/:studentId/semester/:semesterId", async (req, res) => {
  const { studentId, semesterId } = req.params;
  try {
    const semesters = await prisma.studentSemester.findUnique({
      where: {
        studentId_semesterId: {
          studentId: Number(studentId),
          semesterId: Number(semesterId),
        },
      },
    });
    res.json(semesters);
  } catch (err) {
    res.json({ error: "wrong data", errMsg: err.message });
  }
});

//creat student semester
router.post("/student/:studentId/semester/:semesterId", async (req, res) => {
  const { studentId, semesterId } = req.params;
  const getLastGPA = async (studentId) => {
    return await prisma.student
      .findUnique({
        where: {
          id: Number(studentId),
        },
        select: {
          numericalLastTermGPA: true,
        },
      })
      .then(({ numericalLastTermGPA }) => numericalLastTermGPA);
  };

  const lastTermGPA = await getLastGPA(studentId);
  try {
    const createsemester = await prisma.studentSemester.create({
      data: {
        studentId: Number(studentId),
        semesterId: Number(semesterId),
        creditHave: Number(lastTermGPA) >= 2 ? 18 : 12,
      },
    });
    res.json(createsemester);
  } catch (err) {
    res.json({ error: "wrong data", errMsg: err.message });
  }
});

module.exports = router;
