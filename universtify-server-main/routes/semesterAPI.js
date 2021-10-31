const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

//GET all semesters
router.get("/semesters", async (req, res) => {
  try {
    const semester = await prisma.semester.findMany({
      include: {
        Courses: true,
        students: true,
        enrollments: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.json(semester);
  } catch (err) {
    res.json({ error: "wrong data", errMsg: err.message });
  }
});

//GET one semester
router.get("/semester/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const semester = await prisma.semester.findUnique({
      where: { id: Number(id) },
      include: {
        Courses: true,
        students: true,
        enrollments: true,
      },
    });
    res.json(semester);
  } catch (err) {
    res.json({ error: "wrong data", errMsg: err.message });
  }
});
//creat semester
router.post("/semester", async (req, res) => {
  const { type, year, coordinatorId } = req.body;
  try {
    const createsemester = await prisma.semester.create({
      data: {
        type: String(type).toUpperCase(),
        year: Number(year),
        coordinatorId: Number(coordinatorId),
      },
    });
    res.json(createsemester);
  } catch (err) {
    res.json({ error: "wrong data", errMsg: err.message });
  }
});

//update semester => finished
router.put("/semester/:id/end", async (req, res) => {
  const { id } = req.params;

  try {
    const UnEndedSemesterEnrollments = await prisma.semester
      .findUnique({
        where: {
          id: Number(id),
        },
      })
      .enrollments({
        where: { status: "enrolled" },
      });
    if (UnEndedSemesterEnrollments.length > 0) {
      throw new Error(
        "all enrollment in semester must be ended first by adding result for each enrollment"
      );
    }
    const updateSemester = await prisma.semester.update({
      where: {
        id: Number(id),
      },
      data: {
        status: "finished",
      },
      include: {
        students: {
          include: {
            student: { select: { numericalGPA: true, creditDone: true } },
          },
        },
      },
    });

    const students = updateSemester.students.map(
      ({ semesterGPA, creditDone, studentId, student }) => ({
        semesterGPA,
        creditDone,
        studentId,
        previousCreditDone: student.creditDone,
        previousTotalGpa: student.numericalGPA,
      })
    );

    /*
     equation
                    (semesterGPA * semesterCredit) + (previousTotalGpa * previousTotalCredit) 
        totalGPA =  --------------------------------------------------------------------
                                    semesterCredit + previousTotalCredit
    */
    const calculateGPA = (
      semesterGPA,
      semesterCredit,
      previousTotalGpa,
      previousTotalCredit
    ) =>
      (semesterGPA * semesterCredit + previousTotalGpa * previousTotalCredit) /
      (semesterCredit + previousTotalCredit);

    const calculateLevel = (creditDone) => {
      if (creditDone <= 30 && creditDone > 0) return 1;
      if (creditDone <= 60 && creditDone > 30) return 2;
      if (creditDone <= 90 && creditDone > 60) return 3;
      if (creditDone > 90) return 4;
    };
    students.forEach(
      async ({
        semesterGPA,
        creditDone,
        studentId,
        previousCreditDone,
        previousTotalGpa,
      }) => {
        await prisma.student.update({
          where: {
            id: Number(studentId),
          },
          data: {
            numericalLastTermGPA: semesterGPA,
            numericalGPA: calculateGPA(
              semesterGPA,
              creditDone,
              previousTotalGpa,
              previousCreditDone
            ),
            creditDone: {
              increment: creditDone,
            },
            level: calculateLevel(previousCreditDone + creditDone),
          },
        });
      }
    );

    res.json(updateSemester);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//update semester => add course to semester
router.put("/semester/:semesterId/course/:courseId", async (req, res) => {
  const { semesterId, courseId } = req.params;
  try {
    const updateSemester = await prisma.semester
      .update({
        where: {
          id: Number(semesterId),
        },
        data: {
          Courses: {
            connect: { id: Number(courseId) },
          },
        },
      })
      .Courses();
    res.json(updateSemester);
  } catch (err) {
    res.json({ error: "wrong data", errMsg: err.message });
  }
});

//update semester => open registration
router.put("/semester/:semesterId/open", async (req, res) => {
  const { semesterId } = req.params;
  try {
    const updateSemester = await prisma.semester.update({
      where: {
        id: Number(semesterId),
      },
      data: {
        status: "open",
      },
    });

    res.json(updateSemester);
  } catch (err) {
    res.json({ error: "wrong data", errMsg: err.message });
  }
});
//update semester => close registration
router.put("/semester/:semesterId/close", async (req, res) => {
  const { semesterId } = req.params;
  try {
    const updateSemester = await prisma.semester.update({
      where: {
        id: Number(semesterId),
      },
      data: {
        status: "closed",
      },
    });

    res.json(updateSemester);
  } catch (err) {
    res.json({ error: "wrong data", errMsg: err.message });
  }
});

//update semester => start semester
router.put("/semester/:semesterId/start", async (req, res) => {
  const { semesterId } = req.params;
  try {
    const UnreviewedSemesterEnrollments = await prisma.semester
      .findUnique({
        where: {
          id: Number(semesterId),
        },
      })
      .enrollments({
        where: { status: "in review" },
      });
    if (UnreviewedSemesterEnrollments.length > 0) {
      throw new Error(
        "all enrollment in semester must be reviewd (approved or rejected) by advisors first before start semester"
      );
    }
    const updateSemester = await prisma.semester.update({
      where: {
        id: Number(semesterId),
      },
      data: {
        status: "current",
      },
    });

    res.json(updateSemester);
  } catch (err) {
    res.json({ error: err.message });
  }
});
module.exports = router;
