import { DOMinputs } from './base';

export const getInputs = () => DOMinputs.searchInput.value;

export const clearInputs = () => {
    DOMinputs.searchInput.value = '';
};

export const clearResults = () => {
    DOMinputs.searchResList.innerHTML = '';
    DOMinputs.searchResPage.innerHTML = '';
};

export const highlightedClass = id => {
    const resArr = Array.from(document.querySelectorAll('.results__link'));
    resArr.forEach(el => {
        el.classList.remove('results__link--active');
    });
    document.querySelector(`a[href*="#${id}"]`).classList.add('results__link--active');
};

export const limitTitleAlgo = (title, limit = 17) => {
    let newTitle = new Array();
    if (title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            if(acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);
        return `${newTitle.join(' ')}...`;
    }
    return title;
};

const renderRecipe = recipe => {
    const markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitTitleAlgo(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;
    DOMinputs.searchResList.insertAdjacentHTML('beforeend', markup);
};

const createButtons = (page, type) => `
        <button class="btn-inline results__btn--${type}" data-goto = ${type === 'prev' ? page - 1 : page + 1}>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
            </svg>
        </button>            
`;

const renderButtons = (page, numOfRes, resPerPage) => {
    const pages = Math.ceil(numOfRes / resPerPage);
let button;

    if (page === 1 && pages > 1) {
        //need only next button
        button = createButtons(page, 'next');
    } else if(page < pages) {
        //need both forward and backward buttons
        button = `
            ${button = createButtons(page, 'prev')}
            ${button = createButtons(page, 'next')}
        `;
    } else if(page === pages && pages > 1){
        //need only previous button
        button = createButtons(page, 'prev');
    }
    //console.log(DOMinputs.searchResPage);
    DOMinputs.searchResPage.insertAdjacentHTML('afterbegin', button);
};

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;
    
    //render results of current page
    recipes.slice(start, end).forEach(renderRecipe);

    //render buttons of current page
    renderButtons(page, recipes.length, resPerPage);
};
