/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
const api = 'http://localhost:8888';

const headers = {
  Accept: 'application/json'
};

export const getAllMajors = () =>
  fetch(`${api}/majors`, { headers }).then((res) => res.json());

export const createMajor = ({ ...major }) =>
  fetch(`${api}/major`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...major })
  }).then((res) => res.json());
