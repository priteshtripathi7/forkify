export default class Likes {
    constructor() {
        this.likes = new Array();
    }

    addLike(id, title, author, img) {
        const like = {id, title, author, img};
        this.likes.push(like);

        //Store in local storage
        this.persistLike();

        return like;
    }

    deleteLike(id) {
        const ind = this.likes.findIndex(el => el.id === id);
        this.likes.splice(ind, 1);

        //Store in local storage
        this.persistLike();
    }

    isLiked(id) {
        return this.likes.findIndex(el => el.id === id) !== -1 ;
    }

    getNumLikes() {
        return this.likes.length;
    }

    persistLike() {
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }

    retriveLike() {
        const storage = JSON.parse(localStorage.getItem('likes'));
        if(storage) this.likes = storage;
    }
}