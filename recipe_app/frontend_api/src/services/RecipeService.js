import axios from "axios";

const API_URL = 'http://localhost:8000';

export default class RecipeDataService {

    getAllRecipes () {
        const url = `${API_URL}/api/recipes/`;
        return axios.get(url).then(res => res.data);
    }
    getRecipe (id) {
        const url = `${API_URL}/api/recipes/${id}`;
        return axios.get(url).then(res => res.data);
    }
    findRecipeByTitle (title) {
        const url = `${API_URL}/api/recipes?title=${title}`;
        return axios.get(url).then(res => res.data);
    }
    getAllRecipeCategories () {
        const url = `${API_URL}/api/categories/`;
        return axios.get(url).then(res => res.data);
    }
}