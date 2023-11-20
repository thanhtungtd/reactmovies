import React, { useEffect, useState } from 'react';
import MoviesCard, { MovieCardSkeleton } from './MoviesCard';
import {SwiperSlide, Swiper } from "swiper/react";
import useSWR from 'swr';
import { fetcher } from '../../config';

// https://api.themoviedb.org/3/movie/11?api_key=e19297dd210c0b9fcb582119bbdd0e29
// https://api.themoviedb.org/3/movie/now_playing?api_key= abc
const MoviesList = ({type = "now_playing"}) => {
    const { data, error } = 
        useSWR(`https://api.themoviedb.org/3/movie/${type}?api_key=e19297dd210c0b9fcb582119bbdd0e29`, fetcher);
        const isLoading = !data && !error;
    const movies = data?.results || [];
    
        return (
        <div className="movies-list">
            {isLoading && <>
                <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
                    <SwiperSlide>
                    <MovieCardSkeleton></MovieCardSkeleton>
                    </SwiperSlide>
                    <SwiperSlide>
                    <MovieCardSkeleton></MovieCardSkeleton>
                    </SwiperSlide>
                    <SwiperSlide>
                    <MovieCardSkeleton></MovieCardSkeleton>
                    </SwiperSlide>
                    <SwiperSlide>
                    <MovieCardSkeleton></MovieCardSkeleton>
                    </SwiperSlide>
                </Swiper>
            </>}
            {!isLoading && 
                <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
                    {movies.length > 0 && movies.map(item => (
                        <SwiperSlide key={item.id}>  
                        <MoviesCard item={item}></MoviesCard>
                    </SwiperSlide>
                ))}
                </Swiper>
            }   
        </div>
    );
};

export default MoviesList;