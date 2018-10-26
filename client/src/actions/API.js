import axios from "axios";
export default {

  /** PROJECT LEVEL */
  postProject: data => {
    return axios.post("/api/project/", data);
  },
  getProjects: () => {
    return axios.get("/api/project/");
  },
  searchProject: pId => {
    return axios.get(`/api/project/${pId}`);
  },
  updateProject: (data, pId) => {
    return axios.put(`/api/project/${pId}`, data);
  },
  deleteProject: pId => {
    return axios.delete(`/api/project/${pId}`);
  },

  /** LIBRARY LEVEL */
  postLibrary: (data, pId) => {
    return axios.post(`/api/project/${pId}/library/`, data);
  },


  createTestCase: data => {
    return axios.post("/api/testcase", data);
  }
};
