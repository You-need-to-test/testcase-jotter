import axios from "axios";
import { FETCH_USER } from "./types";

export const fetchUser = () => {
  return  function(dispatch) {
    axios.get("/api/current_user")
    .then(res => {
        console.log(res);
        dispatch({ type: FETCH_USER, payload: res })
    });
    // console.log(res)
    // const res = axios.get("http://localhost:5000/api/current_user");
    // dispatch({
    //   type: FETCH_USER,
    //   payload: res
    // });
  };
};

