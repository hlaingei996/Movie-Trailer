class MovieListView {
    constructor(controller) {
        this.controller = controller;
        this.itemTemplate = document.getElementById("movie-info-template").innerHTML;
        this.viewport = document.getElementById("viewport");
        this.viewport.addEventListener('click', (event) => this.detailViewBtnListener(event));
        this.viewport.addEventListener('click', (event) => this.rateMovieListener(event));
        this.home=document.getElementById("home");
        this.home.addEventListener('click',(event)=> this.homeBtnListener(event));

    }
    homeBtnListener(event){
        event.preventDefault();

        const targetEle = event.target;
        
            this.controller.changeListView();
        }
    

    detailViewBtnListener(event) {
        event.preventDefault();

        const targetEle = event.target;
        if (targetEle && targetEle.parentNode.classList.contains('detail-view-button')) {
            const movieId = targetEle.parentNode.dataset.id;
            this.controller.displayDetail(movieId);
        }
        else if (targetEle && targetEle.parentNode.classList.contains('favorite-button')) {
            const movieId = targetEle.parentNode.dataset.id;
            this.controller.favouriteMovie(movieId);
        } 
    }

    rateMovieListener(event) {
        const targetEle = event.target;
        const movieId = targetEle.parentNode.id;
        const value = targetEle.dataset.value;
        console.log("rate movie" + targetEle);
        if (targetEle && targetEle.parentNode.classList.contains('star-wrapper')) {
            this.controller.storeRating(movieId, value);
        }
    }

    getItemTemplate(object) {
        console.log("getItemTemplate"+object.rating);
        let starContent = "";
        let favouriteStar = "";

        for(let star = 1; star <= object.rating; star++){
            starContent += "<i class='fas fa-star' id="+object.id+"_"+star+" data-value="+star+"></i>";
        }
        for(let star=1; star <= (5-object.rating); star++){
            starContent += "<i class='far fa-star' id="+object.id+"_"+star+" data-value="+star+"></i>";
        }

        if(object.favourite){
            favouriteStar += "<i class='fas fa-heart' id="+object.id+"_"+fav+"></i>"        
        }
        else{
            favouriteStar += "<i class='far fa-heart' id="+object.id+"_fav></i>"        
        }
  
        const result = this.itemTemplate
            .replace("{{this.title}}", object.title)
            .replace("{{this.poster}}", `https://image.tmdb.org/t/p/w400/${object.poster}`)
            .replace("{{this.overview}}", this.getExcerptWords(object.overview))
            .replace(/{{this.id}}/g, object.id)
            .replace("{{this.rateId}}", object.id)
            .replace("{{this.favourite}}", favouriteStar)
            .replace("{{this.ratingStars}}", starContent)
            .replace("{{this.favorite}}", object.isFavourite ? 'favorite' : 'unfavorite');
        
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
        console.log("ratingValue" + ratingValue);
        for(let rate=1; rate <= 5; rate++){
            const fillStar = document.getElementById(movieId + "_" + rate);
            fillStar.className="far fa-star";
        }
        for (let rate = 1; rate <= ratingValue; rate++) {
            const fillStar = document.getElementById(movieId + "_" + rate);
            console.log("fillstar" + fillStar);
            if (fillStar.classList.item(0) == 'far') {
                fillStar.className = "fas fa-star";
            } else {
                fillStar.className = "far fa-star";
            }
        }
    }
}

export default MovieListView;