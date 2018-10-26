import axios from "axios";
export default {
  /** PROJECTS */
  postProject: data => {
    return axios.post("/api/project/", data);
  },
  getProjects: () => {
    return axios.get("/api/project/");
  },
  searchProject: id => {
    return axios.get(`/api/project/${id}`);
  },
  updateProject: (data, id) => {
    return axios.put(`/api/project/${id}`, data);
  },
  deleteProject: id => {
    return axios.delete(`/api/project/${id}`);
  },

  /** LIBRARIES */
  
};
