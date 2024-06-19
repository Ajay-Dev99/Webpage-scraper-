import axios from 'axios'


const userInstance = axios.create({
    baseURL: "https://webpage-scraper.onrender.com"
});



userInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.log(error);     
            return Promise.reject(error.response ? error.response.data.message : error.message);
    }
);


export { userInstance };