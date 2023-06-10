import axios from "axios";

const apiClient = axios.create(
    {
    baseURL:'http://localhost:8080'
    }
);

export const retrieveHelloWorldBean= ()=>{
    return axios.get('http://localhost:8080/hello-world');
}

export const retrieveHelloWorldPathVariable= (username)=>
     apiClient.get(`http://localhost:8080/hello-world/path-variable/${username}`, 
    {headers:{
        Authorization: 'Basic dXNlcm5hbWU6cGFzc3dvcmQ='
    }
})

