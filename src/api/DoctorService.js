import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export async function createDoctor(doctor) {
    return await axios.post(API_URL, doctor);
}

export async function getDoctors(page = 0, size = 12) {
    return await axios.get(`${API_URL}?page=${page}&size=${size}`);
}

export async function getDoctor(id) {
    return await axios.get(`${API_URL}/${id}`);
}

export async function udpateDoctor(doctor) {
    return await axios.post(API_URL, doctor);
}

export async function udpatePhoto(formData) {
    return await axios.put(`${API_URL}/photo`, formData);
}

export async function deleteDoctor(id) {
    return await axios.delete(`${API_URL}/${id}`);
}