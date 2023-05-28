//import axios from "axios";
import axios from "./customize-axios";

const fetchAllUser = () => {
    return axios.get("/api/users?page=1");
}

const postCreateUser = (name, job) => {
    return axios.post("/api/users", { name: name, job: job })
}

export { fetchAllUser, postCreateUser };