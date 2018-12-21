import axios from 'axios';
import { key } from '../config';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getRecipe() {
        try {
            const result = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.recipe = result.data.recipes;
        } catch(error) {
            alert(error);
        }
    }
}



//https://www.food2fork.com/api/search
//cbefaa21305a79f2f00585e351890ba2