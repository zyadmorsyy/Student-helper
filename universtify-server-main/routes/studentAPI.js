const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

//creat student
router.post("/student", async (req, res) => {
  const {
    fname,
    lname,
    gender,
    password,
    email,
    majorId,
    minorId,
    supervisorId,
    coordinatorId,
  } = req.body;
  try {
    const createStudent = await prisma.student.create({
      data: {
        fname,
        lname,
        gender,
        password,
        email,
        majorId: majorId ? Number(majorId) : majorId,
        minorId: minorId ? Number(minorId) : minorId,
        supervisorId: Number(supervisorId),
        coordinatorId: Number(coordinatorId),
      },
    });
    res.json(createStudent);
  } catch (err) {
    res.json({ error: "wrong data", errMsg: err.message });
  }
});

//GET all students
router.get("/students", async (req, res) => {
  try {
    const students = await prisma.student.findMany({
      include: {
        coursesFinished: { include: { course: true } },
        enrollments: true,
        notifications: { orderBy: [{ createdAt: "desc" }] },
        major: true,
        minor: true,
        semesters: true,
      },
      orderBy: [{ id: "asc" }],
    });
    res.json(students);
  } catch (err) {
    res.json({ error: "wrong data", errMsg: err.message });
  }
});

//GET user
router.post("/user", async (req, res) => {
  const { email } = req.body;
  try {
    let user = await prisma.student.findUnique({
      where: { email: email.toString() },
      select: {
        id: true,
        email: true,
        password: true,
      },
    });
    if (!user) {
      user = await prisma.supervisor.findUnique({
        where: { email: email },
        select: {
          email: true,
          password: true,
        },
      });
    }
    res.json(user);
  } catch (err) {
    res.json({ error: "wrong data", errMsg: err.message });
  }
});

//GET student by id
router.get("/student/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const student = await prisma.student.findUnique({
      where: { id: Number(id) },
      include: {
        coursesFinished: { include: { course: true, instructor: true } },
        enrollments: true,
        notifications: { orderBy: [{ createdAt: "desc" }] },
        major: true,
        minor: true,
        semesters: { where: { semester: { status: "open" } } },
      },
    });
    res.json(student);
  } catch (err) {
    res.json({ error: "wrong data", errMsg: err.message });
  }
});

//GET student finished courses by id
router.get("/student/:id/courses", async (req, res) => {
  const { id } = req.params;
  try {
    const studentCourses = await prisma.student.findUnique({
      where: { id: Number(id) },
      select: {
        coursesFinished: {
          include: { course: { include: { major: true, minor: true } } },
        },
      },
    });
    res.json(studentCourses);
  } catch (err) {
    res.json({ error: "wrong data", errMsg: err.message });
  }
});

//GET student enrollments by id
router.get("/student/:id/enrollments", async (req, res) => {
  const { id } = req.params;
  try {
    const studentEnrollments = await prisma.student.findUnique({
      where: { id: Number(id) },
      select: {
        enrollments: {
          include: {
            course: { include: { major: true, minor: true } },
            student: {
              select: {
                id: true,
                fname: true,
                lname: true,
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
        },
      },
    });
    res.json(studentEnrollments);
  } catch (err) {
    res.json({ error: "wrong data", errMsg: err.message });
  }
});

//UPDATE student
router.put("/student/:id", async (req, res) => {
  const { id } = req.params;
  const { fname, lname, email, majorId, minorId, supervisorId, coordinatorId } =
    req.body;
  try {
    const updatedStudent = await prisma.student.update({
      where: { id: Number(id) || undefined },
      data: {
        fname,
        lname,
        email,
        majorId: majorId ? Number(majorId) : majorId,
        minorId: minorId ? Number(minorId) : minorId,
        supervisorId: Number(supervisorId),
        coordinatorId: Number(coordinatorId),
      },
    });
    res.json(updatedStudent);
  } catch (error) {
    res.json({ error: `student with ID ${id} does not exist in the database` });
  }
});

//UPDATE supervisor of a student
router.put("/student/:id/supervisor/:supervisorid", async (req, res) => {
  const { id, supervisorid } = req.params;
  try {
    const updatedStudent = await prisma.student.update({
      where: { id: Number(id) || undefined },
      data: { supervisorId: Number(supervisorid) || undefined },
    });
    res.json(updatedStudent);
  } catch (error) {
    res.json({ error: `student with ID ${id} does not exist in the database` });
  }
});

//UPDATE password of a student
router.put("/student/:id/password", async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  try {
    const updatedStudent = await prisma.student.update({
      where: { id: Number(id) || undefined },
      data: { password: password || undefined },
    });
    res.json(updatedStudent);
  } catch (error) {
    res.json({ error: `student with ID ${id} does not exist in the database` });
  }
});

//UPDATE finished courses for a student
router.put("/student/:id/finishedcourses", async (req, res) => {
  const { id } = req.params;
  const { finishedcourses } = req.body; // array of courses IDs
  try {
    const updatedStudent = await prisma.student.update({
      where: { id: Number(id) || undefined },
      data: { coursesFinished: { connect: finishedcourses } },
    });
    res.json(updatedStudent);
  } catch (error) {
    res.json({
      error: `student with ID ${id} does not exist in the database or courses does not exist`,
    });
  }
});

//UPDATE finished courses for a student // will be removed
router.put("/student/:id/enrollments", async (req, res) => {
  const { id } = req.params;
  const { enrollments } = req.body; // array of enrollments IDs
  try {
    const updatedStudent = await prisma.student.update({
      where: { id: Number(id) || undefined },
      data: { enrollments: { connect: enrollments } },
    });
    res.json(updatedStudent);
  } catch (error) {
    res.json({
      error: `student with ID ${id} does not exist in the database or courses does not exist`,
    });
  }
});

//DELETE student
router.delete("/student/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteStudent = await prisma.student.delete({
      where: { id },
    });
    res.json(deleteStudent);
  } catch (err) {
    res.json({ error: "wrong data", errMsg: err.message });
  }
});

module.exports = router;
