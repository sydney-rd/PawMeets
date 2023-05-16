import api from './apiConfig'
import jwtDecode from 'jwt-decode'

export const signUp = async (credentials) => {
  try {
    const resp = await api.post('/auth/signup', credentials)
    localStorage.setItem('token', resp.data.token)
    const user = jwtDecode(resp.data.token)
    return user
  } catch (error) {
    throw error
  }
}

export const signIn = async (credentials) => {
  try {
    const resp = await api.post('/auth/signin', credentials)
    localStorage.setItem('token', resp.data.token)
    const user = jwtDecode(resp.data.token)
    return user
  } catch (error) {
    throw error
  }
}

export const verifyUser = async () => {
  const token = localStorage.getItem('token')
  if (token) {
    const res = await api.get('/auth/verify')
    return res.data
  }
  return false
}

export const signOut = async () => {
  try {
    localStorage.removeItem("token")
  } catch (error) {
    throw error
  }
}

// export const getUser = async (id) => {
//   try {
//     const resp = await api.get(`/auth/getuser/${id}`);
//     localStorage.setItem("token", resp.data.token);
//     const user = jwtDecode(resp.data.token);
//     return user;
//   } catch (error) {
//     throw error;
//   }
// };