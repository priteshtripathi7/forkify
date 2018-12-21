import { DOMinputs } from './base';
import { limitTitleAlgo } from './searchView';

export const toggleLikeBtn = isLiked => {
    const str = isLiked ? 'icon-heart' : 'icon-heart-outlined';
    document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${str}`);
}

export const toggleLikeMenu = numOfLikes => {
    console.log(numOfLikes);
    DOMinputs.likesMenu.style.visibility = numOfLikes > 0 ? 'visible' : 'hidden';
}

export const renderLikes = like => {
    const markup = `
        <li>
        <a class="likes__link" href="#${like.id}">
            <figure class="likes__fig">
                <img src="${like.img}" alt="${like.title}">
            </figure>
            <div class="likes__data">
                <h4 class="likes__name">${limitTitleAlgo(like.title)}</h4>
                <p class="likes__author">${like.author}</p>
            </div>
        </a>
        </li>
    `;
    DOMinputs.likesList.insertAdjacentHTML('beforeend', markup);
};

export const removeLikes = id => {
    const el = document.querySelector(`.likes__link[href*="${id}"]`).parentElement;
    if(el) el.parentElement.removeChild(el);
};

//img/icons.svg#icon-heart-outlined