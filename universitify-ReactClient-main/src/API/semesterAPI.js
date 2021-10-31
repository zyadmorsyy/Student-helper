/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
const api = 'http://localhost:8888';

const headers = {
  Accept: 'application/json'
};

export const getAllSemesters = () =>
  fetch(`${api}/semesters`, { headers }).then((res) => res.json());

export const getOneSemester = (id) =>
  fetch(`${api}/semester/${id}`, { headers }).then((res) => res.json());

export const createSemester = ({ type, year, coordinatorId }) =>
  fetch(`${api}/semester`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ type, year, coordinatorId })
  }).then((res) => res.json());

export const endSemester = (id) =>
  fetch(`${api}/semester/${id}/end`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }
  }).then((res) => res.json());

export const closeRegistrationForSemester = (id) =>
  fetch(`${api}/semester/${id}/close`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }
  }).then((res) => res.json());

export const openRegistrationForSemester = (id) =>
  fetch(`${api}/semester/${id}/open`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }
  }).then((res) => res.json());

export const startSemester = (id) =>
  fetch(`${api}/semester/${id}/start`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }
  }).then((res) => res.json());

export const createStudentSemester = ({ studentId, semesterId }) =>
  fetch(`${api}/student/${studentId}/semester/${semesterId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }
  }).then((res) => res.json());
