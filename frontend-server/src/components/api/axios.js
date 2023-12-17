import axios from 'axios';

export default axios.create({
    baseURL: "https://api.rawg.io/api/"
    // baseURL: "https://fakestoreapi.com/products"
});