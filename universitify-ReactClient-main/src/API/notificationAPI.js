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

export const createNotificationForStudent = (id, notification) =>
  fetch(`${api}/student/${id}/notification`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(notification)
  }).then((res) => res.json());

export const createNotificationForSupervisor = (id, notification) =>
  fetch(`${api}/supervisor/${id}/notification`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(notification)
  }).then((res) => res.json());

export const UpdateNotification = (id, notification) =>
  fetch(`${api}/notification/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(notification)
  }).then((res) => res.json());
