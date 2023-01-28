import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BACKEND_URL } from '@env';

export const SET_CURRENT_USER = 'SET_CURRENT_USER';

export const loginUser = (user, dispatch) => {
  fetch(`${BACKEND_URL}/counter_api/v1/auth/signIn`, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        const token = data.accessToken;
        AsyncStorage.setItem('jwt', token);

        const decoded = jwt_decode(token);
        dispatch(setCurrentUser(decoded, { username: user.username }));
      } else {
        logoutUser(dispatch);
      }
    })
    .catch((err) => {
      console.error(err.message);

      alert('Credenciales incorrectas!');

      logoutUser(dispatch);
    });
};

export const getUserProfile = (id) => {
  fetch(`${BACKEND_URL}users/${id}`, {
    method: 'GET',
    body: JSON.stringify(user),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
};

export const logoutUser = (dispatch) => {
  AsyncStorage.removeItem('jwt');
  dispatch(setCurrentUser({}));
};

export const setCurrentUser = (decoded, user) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
    userProfile: user,
  };
};
