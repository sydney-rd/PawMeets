import api from "./apiConfig.js";

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
    const response = await api.get(`/dogs/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to get dog - error: ${error}`);
    throw error;
  }
};

export const getUserDogs = async () => {
  try {
    const response = await api.get(`/dogs/user/dogs`);
    return response.data;
  } catch (error) {
    console.error(`Failed to get user - error: ${error}`);
    throw error;
  }
};


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
    const response = await api.put(`/dogs/${id}/update`, dogData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteDog = async (dogId) => {
  try {
    const response = await api.post(`/dogs/delete/${dogId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const likeDog = async (dogId, likedDog) => {
  try {
    const response = await api.put(`/dogs/${dogId}/like`, { likedDog });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// export const messageDog = async (dogId, message, likedDog) => {
//   try {
//     const response = await api.post(`/dog/message/${dogId}`, { likedDog, message });
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };
