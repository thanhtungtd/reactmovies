import React, { Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { apiKey, fetcher, tmdbGetAPI } from '../config';
import { Swiper, SwiperSlide } from 'swiper/react';
import MoviesCard from '../components/movies/MoviesCard';

    // https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}
const MoviesDetailsPage = () => {

    const {movieId} = useParams();
    const {data, error} = useSWR( tmdbGetAPI.getMovieDetails(movieId), fetcher );
    if(!data) return null;
    const {backdrop_path, poster_path, title, genres, overview} = data;
    return <div className="pb-10 mt-20">
        <div className="w-full h-[600px] relative">
            <div className="absolute inset-0 bg-black bg-opacity-60 rounded-3xl"></div>
            <div className="h-full w-full bg-center bg-cover bg-no-repeat rounded-3xl" 
                style={{backgroundImage: tmdbGetAPI.imageOriginal(backdrop_path)}}>
            </div>
        </div>
        <div className="w-full h-[440px] max-w-[800px] mx-auto p-[1px] bg-black rounded-xl -mt-[220px] z-10 relative">
            <div className="h-full w-full bg-cover bg-center rounded-xl" 
                style={{backgroundImage: tmdbGetAPI.imageOriginal(poster_path)}}>
            </div>
        </div>
        <h1 className="text-white my-10 text-4xl font-bold text-center">{title}</h1>
        {genres.length > 0 && <div className="flex items-center gap-x-5 text-white mb-10 justify-center">
            {genres.map(item => (
                <span key={item.id} className="py-2 px-8 border border-primary rounded-full">{item.name}</span>
            ))}
        </div>}
        <p className="text-center text-md leading-relaxed max-w-[800px] mx-auto">{overview}</p>
        <MovieCredits></MovieCredits>
        <MovieVideos></MovieVideos>
        <MovieSimilar></MovieSimilar>
    </div>
    
};

function MovieCredits() {
    const {movieId} = useParams();
    const {data, error} = useSWR( tmdbGetAPI.getMovieCredits(movieId), fetcher );
    if(!data) return null;
    const {cast} = data;
    if(!cast || cast.length <= 0) return null;

    return (
        <div className="max-w-[1000px] mx-auto">
            <h2 className="text-center text-white text-3xl font-medium mb-10 mt-16">Casts</h2>
            <div className='grid grid-cols-4 gap-5 justify-center'>
                {cast.slice(0, 4).map(item => (
                    <div className='cast-item' key={item.id}>
                        <div className="h-[350px] w-full bg-cover bg-center rounded-xl" 
                            style={{backgroundImage: tmdbGetAPI.imageOriginal(item.profile_path)}}>
                        </div>
                        <h3 className="text-xl my-2 font-medium ">{item.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    )
}

//------------add video demo--------------
function MovieVideos() {
    const {movieId} = useParams();
    const {data, error} = useSWR(tmdbGetAPI.getMovieVideos(movieId), fetcher);
    if(!data) return null;
    const {results} = data;
    if(!results || results.length <= 0) return null;

    return (
        <div className="py-10">
            <div className='flex flex-col gap-5 mt-5'>
                <h2 className="text-center mb-2 text-3xl font-medium">Trailer</h2>    
                {results.slice(0, 3).map(item => (
                    <div key={item.id}>
                        <h3 className="mb-3 text-lg text-secondary font-medium">{item.name}</h3>
                        <div key={item.id} className="aspect-video w-full mb-5">
                            <iframe width="853" height="480" src={`https://www.youtube.com/embed/${item.key}`} 
                                title="Galaxy S24 Ultra và toàn bộ thiết kế mới - Cái kết của một xu hướng!" frameBorder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                allowFullScreen
                                className="w-full h-full object-fill rounded-xl">
                            </iframe>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

function MovieSimilar() {
    const {movieId} = useParams();
    const {data, error} = useSWR(tmdbGetAPI.getMovieSimilar(movieId), fetcher);
    console.log(data);
    // https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}
    if(!data) return null;
    const {results} = data;
    if(!results || results.length <= 0) return null;

     return (
        <div>
            <h2 className="text-center text-white text-3xl font-medium mb-10 mt-16">Similar Movies</h2>
            <div className="movies-list">
                <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
                {results.length > 0 && results.map(item => (
                        <SwiperSlide key={item.id}>  
                        <MoviesCard item={item}></MoviesCard>
                    </SwiperSlide>
                ))}
                </Swiper>
            </div>
        </div>
     )
}
export default MoviesDetailsPage;
