import axios from 'axios';
import { key } from '../config';

export default class Recipe {
    constructor (id) {
        this.id = id;
    }

    async getRecipe() {
        try {
            const res = await axios(`https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
        } catch(error) {
            alert(error);
            console.log(error);
        }
    }

    calcTime() {
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    }

    calcServings() {
        this.servings = 4;
    }

    parseIngredients () {
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
        const newUnits = [...unitsShort, 'kg', 'g'];

        const newIngredients = this.ingredients.map(el => {
            // 1.Uniform units
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, newUnits[i]);
            });

            // 2.Remove paranthesis
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ')

            // 3.Parse ingredients into unit count and ingredient
            const arrIng = ingredient.split(' ');
            const unitIndex = arrIng.findIndex(el2 => newUnits.includes(el2));
    
            let objIng;
            if(unitIndex > -1) {
                // Both count and unit present
                const arrCount = arrIng.slice(0, unitIndex);
                let count;
                
                if(arrCount.length === 1) {
                    count = eval(arrCount[0].replace('-', '+'));
                } else {
                    count = eval(arrCount.join('+'));
                }
                objIng = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex + 1).join(' ')
                }

            } else if (parseInt(arrIng[0], 10)) {
                //Only count present but no units like 1 Egg
                objIng = {
                    count: arrIng[0],
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')
                }
            } else if(unitIndex === -1) {
                //Neither unit nor count present;
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient
                };
            }
            return objIng;
        });
        this.ingredients = newIngredients;
    }

    updateServings(type) {
        //Calculate the new servings
        const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1;
        console.log(newServings);
        //Alter the number of servings
        this.ingredients.forEach(el => {
            el.count *= (newServings / this.servings);
        });

        //Assign the new servings to the object
        this.servings = newServings;
    }

}