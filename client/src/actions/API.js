import axios from "axios";
export default {

  /** PROJECT LEVEL */
  postProject: data => {
    return axios.post("/api/project/", data);
  },
  getProjects: () => {
    return axios.get("/api/project/");
  },
  // searchProject: pId => {
  //   return axios.get(`/api/project/${pId}`);
  // },
  deleteProject: pId => {
    return axios.delete(`/api/project/${pId}`);
  },
  updateProject: (data, pId) => {
    return axios.put(`/api/project/${pId}`, data);
  },

  /** LIBRARY LEVEL */
  // postLibrary: (data, pId) => {
  postLibrary: data => {
    return axios.post(`/api/library/`, data);
  },
  getLibraries: pId => {
    return axios.get(`/api/project/${pId}/library/`);
  },
  // searchLibrary: lId => {
  //   return axios.get(`/api/library/${lId}`);
  // },
  deleteLibrary: lId => {
    return axios.delete(`/api/library/${lId}`);
  },
  updateLibrary: (data, lId) => {
    return axios.put(`/api/library/${lId}`, data);
  },

  /** CASE LEVEL */
  createTestCase: data => {
    return axios.post("/api/testcase", data);
  }
};
