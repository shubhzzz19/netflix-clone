import React,{useState,useEffect} from 'react';
import axios from './axios';
import './Row.css';
import Youtube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const base_url="https://image.tmdb.org/t/p/original/";
function Row({title,fetchUrl,isLargeRow}) {
    const [movies,setMovies]=useState([]);
    
    const [trailerUrl,setTrailerUrl]=useState("");

    //Snippet code runs based on specific condition or variable
    useEffect(()=>{
        //if [],runs once , do not renders again 
        async function fetchData(){
            const request=await axios.get(fetchUrl);
            //https://api.themoviedb.org/3/fetchUrl
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    },[fetchUrl]);

    const opts={
        height:"390",
        width:"100%",
        playerVars:{autoplay:1},
    };

    const handleClick=(movie)=>{
        if(trailerUrl) {
            setTrailerUrl("");
        }
        else {
            movieTrailer(movie?.name|| "").then(
                (url)=>{
                const urlPar = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlPar.get('v'));
            }).catch((error)=>console.log(error));
        }
    };

  return (
    <div className='row'>
        {/*title*/}
            <h2>{title}</h2>
        {/*title-ends*/}


        {/*content -> posts*/}
        <div className='row-posters'>
            {/*poster*/}
            {movies.map(movie=>(
                //baseurl-moviepath
                <img 
                    key={movie.id}
                    onClick={()=>handleClick(movie)}
                    className={`row-poster ${isLargeRow && "row-posterLarge"}`} 
                    src={`${base_url}${isLargeRow?movie.poster_path:movie.backdrop_path}`} 
                    alt={movie.name}/>
            ))}
        </div>
        {/*content -> posts-ends*/}
    
    {/*showing trailor via youtube*/} 
    {trailerUrl && <Youtube videoId={trailerUrl} opts={opts}/>}
    </div>
  );

}

export default Row
