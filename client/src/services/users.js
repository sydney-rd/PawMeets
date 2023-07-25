import api from './apiConfig'
import jwtDecode from 'jwt-decode'

export const signUp = async (credentials) => {
  try {
    const resp = await api.post('/auth/signup', credentials)
    if(resp.data.error){
      throw new Error(resp.data.error);
    }

    localStorage.setItem('token', resp.data.token)
    const user = jwtDecode(resp.data.token)
    return user
  } catch (error) {
    throw error
  }
}


export const login = async (credentials) => {
  try {
    const resp = await api.post('/auth/login', credentials)
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
    localStorage.removeItem("currentProfile") 
    localStorage.removeItem("refresh")
    localStorage.removeItem("userLikedDogIds")
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