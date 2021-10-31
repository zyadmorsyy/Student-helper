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
export const getCourse = (id) =>
  fetch(`${api}/course/${id}`, { headers }).then((res) => res.json());

export const getAllCourses = () =>
  fetch(`${api}/courses`).then((res) => res.json());

export const getAllCoursesByMajorAndLevel = (major, level) =>
  fetch(`${api}/courses/major/${major}/${level}`).then((res) => res.json());

export const getAllCoursesByMinorAndLevel = (minor, level) =>
  fetch(`${api}/courses/minor/${minor}/${level}`).then((res) => res.json());

export const createOne = (course) =>
  fetch(`${api}/course/`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(course)
  }).then((res) => res.json());

export const deleteCourse = (id) =>
  fetch(`${api}/course/${id}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }
  }).then((res) => res.json());

export const updateCoursePrerequisites = (id, prerequisites) =>
  fetch(`${api}/course/${id}/prerequisites`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(prerequisites)
  }).then((res) => {
    res.json();
  });
