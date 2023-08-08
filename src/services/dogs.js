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

export const getDogBreeds = async () => {
  try {
    const response = await api.get("/dogs/breeds");
    return response.data;
  } catch (error) {
    console.error("Error fetching dog breeds:", error);
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

export const getUserDogsMatches = async () => {
  try {
    const response = await api.get(`/dogs/user/dogs/matches`);
    return response.data;
  } catch (error) {
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

export const deleteDog = async (dogId) => {
  try {
    const response = await api.post(`/dogs/delete/${dogId}`);
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

export const likeDog = async (dogId, likedDog) => {
  try {
    const response = await api.put(`/dogs/${dogId}/like`, { likedDog });
    return response.data;
  } catch (error) {
    throw error;
  }
};
