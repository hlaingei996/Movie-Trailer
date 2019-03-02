class MovieListView {
    constructor(controller) {
        this.controller = controller;
        this.itemTemplate = document.getElementById("movie-info-template").innerHTML;
        this.viewport = document.getElementById("viewport");
        this.viewport.addEventListener('click', (event) => this.detailViewBtnListener(event));
        this.viewport.addEventListener('click', (event) => this.rateMovieListener(event));
        this.viewport.addEventListener('click', (event) => this.favouriteMovieListener(event));
    }

    detailViewBtnListener(event) {
        event.preventDefault();

        const targetEle = event.target;
        if (targetEle && targetEle.parentNode.classList.contains('detail-view-button')) {
            const movieId = targetEle.parentNode.dataset.id;
            this.controller.displayDetail(movieId);
        }
    }

    rateMovieListener(event) {
        const targetEle = event.target;
        const movieId = targetEle.parentNode.id;
        const value = targetEle.dataset.value;
        //console.log("rating",movieId);
        if (targetEle && targetEle.parentNode.classList.contains('star-wrapper')) {
            this.controller.storeRating(movieId, value);
        }
    }

    favouriteMovieListener(event){
        const targetEle = event.target;
        const movieId = targetEle.parentNode.id;
        const key = "Favourite Movie";
        console.log("favourite", movieId);
        //const value = targetEle.dataset.value;
        if (targetEle && targetEle.parentNode.classList.contains('favourite-wrapper')) {
            this.controller.storeFavourite(key, movieId);
        }
    }

    getItemTemplate(object) {
        let starContent = "";
        let favouriteStar = "";

        for(let star = 1; star <= object.rating; star++){
            starContent += "<i class='fas fa-star' id="+object.id+"_"+star+" data-value="+star+"></i>";
        }
        for(let star=1; star <= (5-object.rating); star++){
            starContent += "<i class='far fa-star' id="+object.id+"_"+star+" data-value="+star+"></i>";
        }

        if(object.favourite){
            favouriteStar += "<i class='material-icons' id="+object.id+">favorite</i>"        
        }
        else{
            favouriteStar += "<i class='material-icons' id="+object.id+">favorite_border</i>"        
        }
  
        const result = this.itemTemplate
            .replace("{{this.title}}", object.title)
            .replace("{{this.poster}}", `https://image.tmdb.org/t/p/w400/${object.poster}`)
            .replace("{{this.overview}}", this.getExcerptWords(object.overview))
            .replace("{{this.id}}", object.id)
            .replace("{{this.rateId}}", object.id)
            .replace("{{this.ratingStars}}", starContent)
            .replace("{{this.favouriteId}}", object.id)
            .replace("{{this.favourite}}", favouriteStar);
        
        return result;
    }

    getExcerptWords(mainString) {
        const sliced = mainString.slice(0, 100)
        const split = sliced.split(" ");
        split.splice(-1, 1);
        const joined = split.join(" ");
        return joined + "...";
    }

    render(templates) {
        document.documentElement.scrollTop = 0;
        this.viewport.innerHTML = "";
        for (let template of templates) {
            this.viewport.innerHTML += template;
        }
    }

    rateMovie(movieId, ratingValue) {
        //console.log("ratingValue" + ratingValue);
        for(let rate=1; rate <= 5; rate++){
            const fillStar = document.getElementById(movieId + "_" + rate);
            fillStar.className="far fa-star";
        }
        for (let rate = 1; rate <= ratingValue; rate++) {
            const fillStar = document.getElementById(movieId + "_" + rate);
            if (fillStar.classList.item(0) == 'far') {
                fillStar.className = "fas fa-star";
            } else {
                fillStar.className = "far fa-star";
            }
        }
    }

    favouriteMovie(movieId){
        const favourite = document.getElementById(movieId);
        favourite.className = "material-icons";
    }
}

export default MovieListView;