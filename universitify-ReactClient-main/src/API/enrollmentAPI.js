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
export const getEnrollment = (id) =>
  fetch(`${api}/enrollment/${id}`, { headers }).then((res) => res.json());

export const getAllEnrollments = () =>
  fetch(`${api}/enrollments`).then((res) => res.json());

export const getAllEnrollmentsByCourseId = (id) =>
  fetch(`${api}/course/${id}/enrollments`).then((res) => res.json());

export const getCurrentEnrolledCoursesByStudentId = (id) =>
  fetch(`${api}/student/${id}/enrolledCourses`, { headers }).then((res) =>
    res.json()
  );
export const createOne = ({ ...enrollment }) =>
  fetch(`${api}/enrollment/`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...enrollment })
  }).then((res) => res.json());

export const deleteEnrollment = (id) =>
  fetch(`${api}/enrollment/${id}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }
  }).then((res) => res.json());

export const UpdateEnrollment = (id, enrollment) =>
  fetch(`${api}/enrollment/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(enrollment)
  }).then((res) => res.json());

export const EndEnrollment = (id, finishCourseData) =>
  fetch(`${api}/enrollment/${id}/addresult`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(finishCourseData)
  }).then((res) => res.json());
