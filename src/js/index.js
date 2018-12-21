import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as shoppingView from './views/shoppingView';
import * as likeView from './views/likeView';
import { DOMinputs, renderLoader, clearLoader } from './views/base';





/** Global state of the object
 * - Search object
 * - Current recipe object
 * - Shopping List object
 * - Liked recipe 
 */

const state = {};
window.state = state;

const controlSearch = async () => {
    // 1.Get query from the view
    const query = searchView.getInputs(); //TODO
    //const query = 'pizza';
    //console.log(query);
    if(query) {
        // 2.New search Object and add to states
        state.search = new Search(query);
        
        // 3.Prepare UI for result
        searchView.clearInputs();
        searchView.clearResults();
        renderLoader(DOMinputs.searchRes);

        try {
            // 4.Search for recipe
            await state.search.getRecipe();

            // 5.Write recipe to the UI
            clearLoader();
            searchView.renderResults(state.search.recipe, 1);
        } catch(error) {
            alert('OOPS there was a problem loading the list :(');
        }
    }
};


DOMinputs.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

//TESTING
// window.addEventListener('load', e => {
//     e.preventDefault();
//     controlSearch();
// });

DOMinputs.searchResPage.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if(btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.recipe, goToPage);
    }
});

/** RECIPE CONTROLLER
 * 
 */

const controlRecipe = async () => {
    // Getting the id of the recipe
    const id = window.location.hash.replace('#', '');
    //console.log(id);

    if(id) {
        // making the UI ready
        recipeView.clearRecipe();
        renderLoader(DOMinputs.searchRecipe);
        
        //Highlight the selected recipe
        if(state.search) searchView.highlightedClass(id);

        // making new recipe object
        state.recipe = new Recipe(id);
        //TESTING 
        //window.r = state.recipe;

        try {
            // getting recipe from the server and parse ingredients
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            // calling basic functions
            state.recipe.calcTime();
            state.recipe.calcServings();

            //rendering recipe
            clearLoader();
            //console.log(state.recipe);
            recipeView.renderRecipe(
                state.recipe,
                state.likes.isLiked(id)    
            );
            

        } catch(error) {
            alert(error);
        }
    }
};

/** RECIPE CONTROLLER
 * 
 */

const controlList = () => {
    // Create a new list if not existing
    if(!state.list) state.list = new List();

    //Add items to the model and the UI
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        //TESTING
        //console.log(item);
        shoppingView.renderItem(item);
    });
};

/** LIKE CONTROLLER
 * 
 */


const controlLike = () => {
    //get the id
    console.log('reaches');
    if(!state.likes) state.likes = new Likes();

    const currentID = state.recipe.id;
    if(!state.likes.isLiked(currentID)) {
        // Add to the like list
        const newLike = state.likes.addLike(
            currentID,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img
        );
        //Toggle like button
        likeView.toggleLikeBtn(true);
        //Update the UI
        likeView.renderLikes(newLike);
    } else {
        // Remove from the like list
        state.likes.deleteLike(currentID);

        //Toggle like button
        likeView.toggleLikeBtn(false);
        //Update UI
        likeView.removeLikes(currentID);
    }
    likeView.toggleLikeMenu(state.likes.getNumLikes());
};

['hashchange', 'load'].forEach(cur => window.addEventListener(cur, controlRecipe));

DOMinputs.searchRecipe.addEventListener('click', e => {
    if(e.target.matches('.btn-decrease, .btn-decrease *')) {
        //console.log('dec');
        if(state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateRecipeView(state.recipe);
        }
    } else if(e.target.matches('.btn-increase, .btn-increase *')) {
        //console.log('inc');
        state.recipe.updateServings('inc');
        recipeView.updateRecipeView(state.recipe);
    } else if(e.target.matches('.recipe__btn--add, .recipe__btn--add *')){
        controlList();
    } else if (e.target.matches('.recipe__love, .recipe__love *')) {
        //console.log(e.target);
        controlLike();
    }
    //TESTING
    //console.log(state.recipe);
});

window.addEventListener('load', () => {
    
    state.likes = new Likes();

    state.likes.retriveLike();

    likeView.toggleLikeMenu(state.likes.getNumLikes());

    state.likes.likes.forEach(like => {
        likeView.renderLikes(like);
    });
});

DOMinputs.searchShopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;
    //TESTING
    //console.log(id);
    //Handle the delete button
    //console.log('clicked');


    if(e.target.matches('.shopping__delete, .shopping__delete *')) {
        //Delete item from the state list
        //TESTING
        //console.log('clicked');
        state.list.deleteItem(id);

        //Delete item from UI
        shoppingView.removeItem(id);
    } else if (e.target.matches('.shopping__count-value')) {
        const val = parseFloat(e.target.value);
        //console.log(val);
        if(val > 0) {
            state.list.updateItem(id, val);
        }
    } 
});
