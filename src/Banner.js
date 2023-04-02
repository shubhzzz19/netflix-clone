import React,{useState,useEffect} from 'react'
import axios from './axios'
import requests from './requests';
import './Banner.css';
function Banner() {
    const [movie,setMovie]=useState([]);
    //Snippet code runs based on specific condition or variable
    useEffect(()=>{
        //if [],runs once , do not renders again 
        async function fetchData(){
            const request=await axios.get(requests.fetchNetflixOriginals);
            setMovie(request.data.results[Math.floor(Math.random()*request.data.results.length-1)]);

            return request;
        }
        fetchData();
    },[]);

    function truncate(str,n){
        return str?.length>n ? str.substr(0,n-1)+".....":str;
    }
  return (
    <header  className='banner'
    style={{
        backgroundSize:"cover",
        backgroundImage:`url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition:"center center",
    }}
    > 

        
        <div className='banner-contents'>
            {/*title of banner*/}
            <h1>{movie?.title||movie?.name||movie?.original_name}</h1>
        
            {/*buttons of banner*/}
            <div className='banner-buttons'>
                <button className='banner-button'>Play</button>
                <button className='banner-button'>My List</button>
            </div>

            {/*to replace string more than 150 with '....'*/}
            <div className='banner-dis'>{truncate(movie?.overview,150)}</div> 
        </div>

        {/*to give the fade in the bottom of the banner*/}
        <div className='banner-fadeBottom'/>
        
    </header>
    
  )
}

export default Banner
