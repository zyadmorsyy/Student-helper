const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

//GET all enrollments
router.get("/enrollments", async (req, res) => {
  try {
    const enrollments = await prisma.enrollment.findMany({
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        isAproved: true,
        status: true,
        course: {
          select: {
            id: true,
            name: true,
            major: true,
            minor: true,
          },
        },
        student: {
          select: {
            id: true,
            fname: true,
            lname: true,
            supervisorId: true,
          },
        },
        supervisor: {
          select: {
            id: true,
            fname: true,
            lname: true,
          },
        },
      },
      orderBy: [{ id: "desc" }],
    });
    res.json(enrollments);
  } catch (err) {
    res.json({ error: "wrong data", errMsg: err.message });
  }
});

//GET enrollment by id
router.get("/enrollment/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const enrollment = await prisma.enrollment.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        isAproved: true,
        status: true,
        course: {
          select: {
            id: true,
            name: true,
          },
        },
        student: {
          select: {
            id: true,
            fname: true,
            lname: true,
            supervisorId: true,
          },
        },
        supervisor: {
          select: {
            id: true,
            fname: true,
            lname: true,
          },
        },
      },
    });
    res.json(enrollment);
  } catch (err) {
    res.json({ error: "wrong data", errMsg: err.message });
  }
});

router.get("/student/:id/enrolledCourses", async (req, res) => {
  const { id } = req.params;
  try {
    const studentEnrolledCourses = await prisma.enrollment.findMany({
      where: {
        AND: [{ status: "enrolled" }, { studentID: Number(id) }],
      },
      include: {
        course: { include: { major: true, minor: true } },
        student: {
          select: {
            id: true,
            fname: true,
            lname: true,
            supervisorId: true,
          },
        },
        supervisor: {
          select: {
            fname: true,
            lname: true,
          },
        },
      },
      orderBy: [{ id: "desc" }],
    });
    res.json(studentEnrolledCourses);
  } catch (err) {
    res.json({ error: "wrong data", errMsg: err.message });
  }
});

//creat enrollment
router.post("/enrollment", async (req, res) => {
  const { studentID, courseID, credit, semesterId } = req.body;
  try {
    const createenrollment = await prisma.enrollment.create({
      data: {
        studentID: Number(studentID),
        courseID: Number(courseID),
        semesterId: Number(semesterId),
        credit: Number(credit),
      },
    });
    const updateSemester = await prisma.studentSemester.update({
      where: {
        studentId_semesterId: {
          studentId: Number(studentID),
          semesterId: Number(semesterId),
        },
      },
      data: {
        creditHave: {
          decrement: Number(credit),
        },
      },
    });

    res.json(createenrollment);
  } catch (err) {
    res.json({ error: "wrong data", errMsg: err.message });
  }
});

//UPDATE enrollment
router.put("/enrollment/:id", async (req, res) => {
  const { id } = req.params;
  const { supervisorId, isAproved, status, credit } = req.body;

  const previousStatus = await prisma.enrollment
    .findUnique({
      where: { id: Number(id) },
      select: { status: true },
    })
    .then(({ status }) => status);

  const UpdatedEnrollment = await prisma.enrollment.update({
    where: { id: Number(id) },
    data: {
      supervisorId,
      isAproved: Boolean(isAproved),
      status,
    },
  });
  if (status === "rejected") {
    const updateSemester = await prisma.studentSemester.update({
      where: {
        studentId_semesterId: {
          studentId: Number(UpdatedEnrollment.studentID),
          semesterId: Number(UpdatedEnrollment.semesterId),
        },
      },
      data: {
        creditHave: {
          increment: Number(credit),
        },
      },
    });
  } else if (previousStatus === "rejected" && status === "in review") {
    const updateSemester = await prisma.studentSemester.update({
      where: {
        studentId_semesterId: {
          studentId: Number(UpdatedEnrollment.studentID),
          semesterId: Number(UpdatedEnrollment.semesterId),
        },
      },
      data: {
        creditHave: {
          decrement: Number(credit),
        },
      },
    });
  }
  res.json(UpdatedEnrollment);
});
//delete enrollment
router.delete("/enrollment/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteEnrollment = await prisma.enrollment.delete({
      where: { id: Number(id) },
    });

    const updateSemester = await prisma.studentSemester.update({
      where: {
        studentId_semesterId: {
          studentId: Number(deleteEnrollment.studentID),
          semesterId: Number(deleteEnrollment.semesterId),
        },
      },
      data: {
        creditHave: {
          increment: Number(deleteEnrollment.credit),
        },
      },
    });
    res.json(deleteEnrollment);
  } catch (err) {
    res.json({ error: "wrong data", errMsg: err.message });
  }
});

module.exports = router;
