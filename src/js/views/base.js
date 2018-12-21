export const DOMinputs = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchResList: document.querySelector('.results__list'),
    searchRes: document.querySelector('.results'),
    searchResPage: document.querySelector('.results__pages'),
    searchRecipe: document.querySelector('.recipe'),
    searchShopping: document.querySelector('.shopping__list'),
    shoppingList :document.querySelector('.recipe__btn--add'),
    likesMenu: document.querySelector('.likes__field'),
    likesList: document.querySelector('.likes__list')
};

export const DOMstrings = {
    loader: 'loader'
};

export const renderLoader = parent => {
    const loader = `
        <div class="${DOMstrings.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
    const loader = document.querySelector(`.${DOMstrings.loader}`);
    if(loader) {
        loader.parentElement.removeChild(loader);
    }
}
