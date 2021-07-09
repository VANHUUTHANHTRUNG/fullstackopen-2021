import axios from "axios";
const baseURL = "http://localhost:3001/persons";

const getAll = async () => {
    const request = axios.get(baseURL);
    return request.then((response) => response.data);
};

const addPerson = async (newObject) => {
    const request = axios.post(baseURL, newObject);
    return request.then((response) => response.data);
};

const removePerson = async (removedObjectID) => {
    const request = axios.delete(`${ baseURL }/${removedObjectID}`);
    return request.then((response) => {
        return response.data;
    });
};

const updatePerson = async (updatedObjectID, updatedObject) => {
    const request = axios.put(`${ baseURL }/${updatedObjectID}`, updatedObject)
    return request.then(response => response.data)
};

const Persons = { getAll, addPerson, removePerson, updatePerson };

export default Persons;
