import { DOMinputs } from './base';

export const renderItem = item => {
    //TESTING
    //console.log(item);
    const markup = `
        <li class="shopping__item"  data-itemid="${item.id}">
        <div class="shopping__count">
            <input type="number" value="${item.count}" step="${item.count}" class ="shopping__count-value">
            <p>${item.unit}</p>
        </div>
        <p class="shopping__description">${item.ingredient}</p>
        <button class="shopping__delete btn-tiny">
            <svg>
                <use href="img/icons.svg#icon-circle-with-cross"></use>
            </svg>
        </button>
        </li>
    `;
    //console.log('hello ' + DOMinputs.searchShopping);
    DOMinputs.searchShopping.insertAdjacentHTML('beforeend', markup);
};

export const removeItem = id => {
    //console.log(id);
    const it = document.querySelector(`[data-itemId="${id}"]`);
    //console.log(it);
    it.parentElement.removeChild(it);
};