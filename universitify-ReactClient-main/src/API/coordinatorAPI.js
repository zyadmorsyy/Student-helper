/* eslint-disable implicit-arrow-linebreak */
const api = 'http://localhost:8888';

const headers = {
  Accept: 'application/json'
};

export const getCoordinator = (id) =>
  fetch(`${api}/coordinator/${id}`, { headers }).then((res) => res.json());

export const getAllCoordinators = () =>
  fetch(`${api}/coordinators`).then((res) => res.json());

export const createOneCoordinator = (coordinator) =>
  fetch(`${api}/coordinator/`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(coordinator)
  }).then((res) => res.json());

export const updateCoordinator = (id, coordinator) =>
  fetch(`${api}/coordinator/${id}/coordinator/${coordinator}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }
  }).then((res) => res.json());

export const updateCoordinatorPassword = (id, password) =>
  fetch(`${api}/coordinator/${id}/password`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password })
  }).then((res) => res.json());

export const deleteCoordinator = (id) =>
  fetch(`${api}/coordinator/${id}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }
  }).then((res) => res.json());
