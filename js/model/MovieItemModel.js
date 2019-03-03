import APIDataModel from "./APIModel.js";

class Movie extends APIDataModel{
    constructor(id,title,poster,overview,link,rating, favourite){
        super();
        this.id = id;
        this.title = title;
        this.poster = poster;        
        this.overview = overview;
        this.link =link;
        this.rating = rating; 
        this.favourite = favourite;   
    }

    setRating(movieId, ratingValue){
        //console.log("store in local"+ movieId +"value" + ratingValue);
        this.rating = ratingValue;
        localStorage.setItem(movieId, ratingValue);
    }

    getRating(){
        return localStorage.getItem(this.id);
    }
    
    setFavourite(key, movieId){
        //console.log("store in local"+ movieId );
        const favouriteArray =[];
        const data = JSON.parse(localStorage.getItem(key));
        if (data) {
            //localStorage.removeItem(key);
            const valueToRemove = data.indexOf(movieId);
            //console.log(valueToRemove);
            if(valueToRemove > -1){
                data.splice(valueToRemove, 1);
                //console.log(data);
                localStorage.setItem(key, JSON.stringify(data));
            }
            else{
                data.push(movieId);
                localStorage.setItem(key, JSON.stringify(data));
            }                                    
        }
        else{
            favouriteArray.push(movieId);
            localStorage.setItem(key, JSON.stringify(favouriteArray));
        }

    }

    getFavourite(){
        return localStorage.getItem(this.id);
    }

    getDetailApiUrl(movie_id,key){
        return this.generateURL(this.detail_path,movie_id,key);
    }

    getVideoApiURL(movie_id,key){
        return this.generateURL(this.videos_path,movie_id,key);
    }

    generateURL(rawPath,movie_id,key){
        return this.rootURL + rawPath.replace("{movie_id}",movie_id).replace("<<api_key>>",key);
    }

    async fetchMovieDetail(movie_id,key){
        //Get movie detail
        const fetchResult = await fetch(this.getDetailApiUrl(movie_id,key));
        const jsonData = await fetchResult.json();

        //Get videos of the current movie
        const fetchVideo = await fetch(this.getVideoApiURL(movie_id,key));
        const videoJsonData = await fetchVideo.json();

        const convertedPromise = this.updateData(jsonData,videoJsonData.results);
        return convertedPromise;
    }

    updateData(data,videos){
        this.id = data.id;
        this.title = data.original_title;
        this.poster = data.backdrop_path;
        this.overview = data.overview;
        this.videos = videos;
        return this;
    }

}

export default Movie;