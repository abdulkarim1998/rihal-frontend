import axios from "axios";

const baseURL = "http://localhost:5000/";

export const classesEndpoints = (id) => {
  const URL = baseURL + "classes";
  return {
    fetchAll: () => axios.get(URL),
    post: (newClass) => axios.post(URL, newClass),
    update: (updatedClass) => axios.patch(URL + "/" + id, updatedClass),
    delete: () => axios.delete(URL + "/" + id),
  };
};

export const countriesEndpoints = (id) => {
  const URL = baseURL + "countries";

  return {
    fetchAll: () => axios.get(URL),
    post: (newCountry) => axios.post(URL, newCountry),
    update: (updatedCountry) => axios.patch(URL + "/" + id, updatedCountry),
    delete: () => axios.delete(URL + "/" + id),
  };
};

export const studentsEndpoints = (id) => {
  const URL = baseURL + "students";

  return {
    fetchAll: () => axios.get(URL),
    post: (newStudent) => axios.post(URL, newStudent),
    update: (updatedStudent) => axios.patch(URL + "/" + id, updatedStudent),
    delete: () => axios.delete(URL + "/" + id),
  };
};
