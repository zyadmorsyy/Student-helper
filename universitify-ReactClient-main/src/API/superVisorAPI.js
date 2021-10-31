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

export const getSuperVisor = (id) =>
  fetch(`${api}/supervisor/${id}`, { headers }).then((res) => res.json());

export const getAllSuperVisors = () =>
  fetch(`${api}/supervisors`).then((res) => res.json());

export const createOne = (supervisor) =>
  fetch(`${api}/supervisor/`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(supervisor)
  }).then((res) => res.json());

export const updateSuperVisor = (id, supervisor) =>
  fetch(`${api}/supervisor/${id}/supervisor/${supervisor}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }
  }).then((res) => res.json());

export const updateSupervisorPassword = (id, password) =>
  fetch(`${api}/supervisor/${id}/password`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password })
  }).then((res) => res.json());

export const deleteSuperVisor = (id) =>
  fetch(`${api}/supervisor/${id}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }
  }).then((res) => res.json());
