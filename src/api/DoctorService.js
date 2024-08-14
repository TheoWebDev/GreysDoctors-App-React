import axios from "axios";

const API_URL = 'http://localhost:8080/doctors';

export async function createDoctor(contact) {
    return await axios.post(API_URL, contact);
}

export async function getDoctors(page = 0, size = 10) {
    return await axios.get(`${API_URL}?page=${page}&size=${size}`);
}

export async function getDoctor(id) {
    return await axios.get(`${API_URL}/${id}`);
}

export async function udpateDoctor(contact) {
    return await axios.post(API_URL, contact);
}

export async function udpatePhoto(formData) {
    return await axios.put(`${API_URL}/photo`, formData);
}

export async function deleteDoctor(id) {
    return await axios.delete(`${API_URL}/${id}`);
}