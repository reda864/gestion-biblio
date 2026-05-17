import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true
});

export const getBooks = async () => {
    try {
        const response = await api.get('/books');
        return response.data;
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error;
    }
};

export const createBook = async (bookData) => {
    try {
        const response = await api.post('/books', bookData);
        return response.data;
    } catch (error) {
        console.error('Error creating book:', error);
        throw error;
    }
};

export const updateBook = async (id, bookData) => {
    try {
        const response = await api.put(`/books/${id}`, bookData);
        return response.data;
    } catch (error) {
        console.error('Error updating book:', error);
        throw error;
    }
};

export const deleteBook = async (id) => {
    try {
        const response = await api.delete(`/books/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting book:', error);
        throw error;
    }
};

export default api; 