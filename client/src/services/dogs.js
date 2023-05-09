import api from "./apiConfig.js";
import { verifyUser } from "./users.js";

export const getDogs = async () => {
  try {
    const response = await api.get("/dogs");
    return response.data;
  } catch (error) {
    console.error(`Failed to get dogs - error: ${error}`);
    throw error;
  }
};

export const getDog = async (id) => {
  try {
    const response = await api.get(`/dogs/id/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to get dog - error: ${error}`);
    throw error;
  }
};

// export const getUserDogs = async (user) => {
//     const dogRequests = user.dog.map(async (dogId) => {
//       const response = await api.get(`/dogs/id/${dogId}`)
//       return response.data
//     });
//     let response = await Promise.all(dogRequests)
//     return response
// }

export const createDog = async (dogData) => {
  try {
    const response = await api.post("/dogs", dogData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateDog = async (id, dogData) => {
  try {
    const response = await api.put(`/dogs/id/${id}`, dogData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteDog = async (dogId, userId) => {
  try {
    const response = await api.post(`/dogs/delete/${dogId}`, { userId });
    verifyUser()
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const likeDog = async (dogId, likedDog) => {
  try {
    const response = await api.put(`/dogs/like/${dogId}`, {likedDog})
    verifyUser()
    return response.data
  } catch (error) {
    throw error
  }
}