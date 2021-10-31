/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
const api = 'http://localhost:8888';

// // Generate a unique token for storing your bookshelf data on the backend server.
// let { token } = localStorage;
// // eslint-disable-next-line no-multi-assign
// if (!token) token = localStorage.token = Math.random().toString(36).substr(-8);

const headers = {
  Accept: 'application/json'
  // Authorization: token
};

export const getStudent = (id) =>
  fetch(`${api}/student/${id}`, { headers }).then((res) => res.json());

export const getAllStudents = () =>
  fetch(`${api}/students`).then((res) => res.json());

export const createOne = (student) =>
  fetch(`${api}/student/`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(student)
  }).then((res) => res.json());

export const updateStudent = (id, student) =>
  fetch(`${api}/student/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(student)
  }).then((res) => res.json());

export const updateStudentSupervisor = (id, supervisorid) =>
  fetch(`${api}/student/${id}/supervisor/${supervisorid}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }
  }).then((res) => res.json());

export const updateStudentPassword = (id, password) =>
  fetch(`${api}/student/${id}/password`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password })
  }).then((res) => res.json());

export const updateStudentFinishedCourses = (id, finishedCoursesIDs) =>
  fetch(`${api}/student/${id}/finishedcourses`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ finishedCoursesIDs })
  }).then((res) => res.json());

export const deleteStudent = (id) =>
  fetch(`${api}/student/${id}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }
  }).then((res) => res.json());

export const getCoursesFinishedByStudent = (id) =>
  fetch(`${api}/student/${id}/courses`, { headers }).then((res) => res.json());

export const getEnrollmentByStudent = (id) =>
  fetch(`${api}/student/${id}/enrollments`, { headers }).then((res) =>
    res.json()
  );
