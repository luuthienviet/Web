import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Point to your backend URL

export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/${id}`);
    return response;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};