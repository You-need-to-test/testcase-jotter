import axios from "axios";
export default {
  postProject: data => {
    return axios.post("/api/project/", data);
  },
  getProject: data => {
    return axios.get("/api/project/", data);
  }
};
