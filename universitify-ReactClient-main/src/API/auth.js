import { createContext } from 'react';

const jwt = require('jsonwebtoken');

/* eslint-disable arrow-body-style */
const server = 'http://localhost:8888';

// eslint-disable-next-line import/prefer-default-export
export const login = async (email, password) => {
  const res = await fetch(`${server}/api/login`, {
    method: 'POST',
    body: JSON.stringify({
      email,
      password
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (res.status === 200) {
    return res.json().then((data) => {
      return data.token;
    });
  }
  const error = new Error(res.error);
  throw error;
};

export const getUserDataFromToken = async () => {
  fetch(`${server}/api/secret`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
    .then((res) => {
      return res.json().user;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const UserContext = createContext(null);

// eslint-disable-next-line consistent-return
export const currentUser = () => {
  try {
    const loggedUser = jwt.verify(localStorage.getItem('token'), 'jwt_secret');
    return loggedUser.user;
  } catch (err) {
    console.log(err);
    return null;
  }
};
