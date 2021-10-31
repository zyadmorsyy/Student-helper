const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

//GET all courses
router.get("/courses", async (req, res) => {
  try {
    const courses = await prisma.course.findMany({
      include: {
        prerequisites: true,
        enrollments: {
          include: {
            course: {
              select: {
                id: true,
                name: true,
                instructorId: true,
              },
            },
            student: {
              select: {
                id: true,
                fname: true,
                lname: true,
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
          orderBy: [{ updatedAt: "desc" }],
        },
        major: true,
        minor: true,
        instructor: {
          select: {
            id: true,
            fname: true,
            lname: true,
          },
        },
      },
    });
    res.json(courses);
  } catch (err) {
    res.json({ error: "wrong data", errMsg: err.message });
  }
});

//GET course by id
router.get("/course/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const course = await prisma.course.findUnique({
      where: { id: Number(id) },
      include: {
        major: true,
        minor: true,
        instructor: {
          select: {
            id: true,
            fname: true,
            lname: true,
          },
        },
      },
    });
    res.json(course);
  } catch (err) {
    res.json({ error: "wrong data", errMsg: err.message });
  }
});

//GET course enrollments by course id
router.get("/course/:id/enrollments", async (req, res) => {
  const { id } = req.params;
  try {
    const course = await prisma.course.findUnique({
      where: { id: Number(id) },
      include: {
        enrollments: {
          include: {
            course: {
              select: {
                id: true,
                name: true,
                instructorId: true,
              },
            },
            student: {
              select: {
                id: true,
                fname: true,
                lname: true,
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
        },
        instructor: {
          select: {
            id: true,
            fname: true,
            lname: true,
          },
        },
      },
    });
    res.json(course);
  } catch (err) {
    res.json({ error: "wrong data", errMsg: err.message });
  }
});

//GET all courses for spacific level and major // this also will return all non major courses
router.get("/courses/major/:major/:level", async (req, res) => {
  const { major, level } = req.params;
  try {
    const courses = await prisma.course.findMany({
      where: {
        OR: [
          {
            major: { code: major.toUpperCase() },
          },
          {
            type: "universityRequirment",
          },
          {
            type: "facultyRequirment",
          },
          {
            type: "universityElective",
          },
        ],
        AND: {
          level: Number(level),
        },
      },
      include: {
        prerequisites: true,
        prerequisitedBy: true,
        major: true,
        minor: true,
      },
    });
    res.json(courses);
  } catch (err) {
    res.json({ error: "wrong data", errMsg: err.message });
  }
});

//GET all courses for spacific level and minor
router.get("/courses/minor/:minor/:level", async (req, res) => {
  const { minor, level } = req.params;
  try {
    const courses = await prisma.course.findMany({
      where: {
        AND: [
          {
            minor: { code: minor.toUpperCase() },
          },
          {
            level: Number(level),
          },
        ],
      },
      include: {
        prerequisites: true,
        prerequisitedBy: true,
        major: true,
        minor: true,
      },
    });
    res.json(courses);
  } catch (err) {
    res.json({ error: "wrong data", errMsg: err.message });
  }
});

//creat course
router.post("/course", async (req, res) => {
  const {
    name,
    credit,
    discreption,
    courseCode,
    level,
    majorId,
    minorId,
    coordinatorId,
    type,
    isElective,
    instructorId,
  } = req.body;
  try {
    const createCourse = await prisma.course.create({
      data: {
        name,
        credit: Number(credit),
        discreption,
        courseCode,
        level: Number(level),
        majorId: majorId ? Number(majorId) : majorId,
        minorId: minorId ? Number(minorId) : minorId,
        coordinatorId: Number(coordinatorId),
        type: type ? String(type) : type,
        isElective: Boolean(isElective),
        instructorId: Number(instructorId),
      },
    });
    res.json(createCourse);
  } catch (err) {
    res.json({ error: "wrong data", errMsg: err.message });
  }
});

//UPDATE prereq
router.put("/course/:id/prerequisites", async (req, res) => {
  const { id } = req.params;
  const { prerequisites } = req.body; // array of courses codes

  try {
    const prerequisitesIDs = [];
    for await (const courseCode of prerequisites) {
      const courseId = await prisma.course.findFirst({
        where: { courseCode },
        select: { id: true },
      });

      prerequisitesIDs.push(courseId);
    }

    const updateCourse = await prisma.course.update({
      where: { id: Number(id) },
      data: {
        prerequisites: {
          connect: prerequisitesIDs,
        },
      },
    });
    res.json(updateCourse);
  } catch (err) {
    res.json({ error: "wrong data", errMsg: err.message });
  }
});

//creat finished course ==> end enrollment by adding result
router.post("/enrollment/:id/addresult", async (req, res) => {
  const { id } = req.params;

  const { courseId, studentID, grade, semesterId, credit, instructorId } =
    req.body;
  try {
    const createFinishedCourse = await prisma.finishedCourses.create({
      data: {
        courseId: Number(courseId),
        studentID: Number(studentID),
        grade: Number(grade),
        semesterId: Number(semesterId),
        credit: Number(credit),
        instructorId: Number(instructorId),
      },
    });
    const deletedEnrollment = await prisma.enrollment.delete({
      where: { id: Number(id) },
    });

    const studentSemester = await prisma.studentSemester.findUnique({
      where: {
        studentId_semesterId: {
          studentId: Number(studentID),
          semesterId: Number(semesterId),
        },
      },
    });
    /*
     equation
                    (courseGPA * CourseCredit) + (previousTotalGpa * previousTotalCredit) 
        termGPA =  --------------------------------------------------------------------
                                    CourseCredit + previousTotalCredit
    */
    const calculateGPA =
      (gpaConverter(grade).value * Number(credit) +
        Number(studentSemester.semesterGPA) *
          Number(studentSemester.creditDone)) /
      (Number(studentSemester.creditDone) + Number(credit));

    const updatedSemester = await prisma.studentSemester.update({
      where: {
        studentId_semesterId: {
          studentId: Number(studentID),
          semesterId: Number(semesterId),
        },
      },
      data: {
        creditDone: {
          increment: Number(deletedEnrollment.credit),
        },
        semesterGPA: calculateGPA,
      },
    });
    res.json(createFinishedCourse);
  } catch (err) {
    res.json({ error: "wrong data", errMsg: err.message });
  }
});

const gpaConverter = (grade) => {
  if (grade <= 100 && grade > 90) return { code: "A", value: 4 };
  if (grade <= 90 && grade > 85) return { code: "A-", value: 3.7 };
  if (grade <= 85 && grade > 80) return { code: "B+", value: 3.3 };
  if (grade <= 80 && grade > 75) return { code: "B", value: 3 };
  if (grade <= 75 && grade > 70) return { code: "B-", value: 2.7 };
  if (grade <= 70 && grade > 65) return { code: "C+", value: 2.3 };
  if (grade <= 65 && grade > 60) return { code: "C", value: 2 };
  if (grade <= 60 && grade > 55) return { code: "C-", value: 1.7 };
  if (grade <= 55 && grade > 53) return { code: "D+", value: 1.3 };
  if (grade <= 53 && grade >= 50) return { code: "D", value: 1 };
  if (grade < 50) return { code: "F", value: 0 };
};

module.exports = router;
