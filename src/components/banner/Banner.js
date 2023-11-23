import React, { useEffect } from 'react';
import useSWR from 'swr';
import { fetcher } from '../../config';
import {SwiperSlide, Swiper } from "swiper/react";
import Button from '../button/Button';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
    const { data } = 
        useSWR(`https://api.themoviedb.org/3/movie/upcoming?api_key=e19297dd210c0b9fcb582119bbdd0e29`, fetcher);
    const movies = data?.results || [];
    // console.log(movies)
    return (
        <section className="banner mt-20 h-[60vh] page-container relative overflow-hidden mb-10">
            <Swiper grabCursor={true} slidesPerView={"auto"}>
                {movies.length > 0 && movies.map(item => (
                    <SwiperSlide key={item.id}>
                        <BannerItem item={item}></BannerItem>
                    </SwiperSlide>
                ))}    
            </Swiper>
        </section>
    );
};

function BannerItem({item}) {
    const { title, poster_path, id, } = item;
    const navigate = useNavigate();
    return (
        <div className="w-full h-full rounded-xl overflow-hidden absolute">
            <div className="object-top absolute rounded-xl inset-0 bg-gradient-to-t from-gray-800 to-transparent"></div>
            <img src={`https://image.tmdb.org/t/p/original/${poster_path}`}
                className="object-t object-c w-full h-full rounded-xl" alt=""/>

                <div className="absolute will-change-auto h1/2 left-5 bottom-5 right-5 mb-2">
                    <h2 className="text-white font-bold text-4xl">{title}</h2>
                    <div className="flex items-center gap-x-3 text-white my-5">
                        <span className="border border-white py-1 px-2 rounded-md">Marvel</span>
                        <span className="border border-white py-1 px-2 rounded-md">Cinematic</span>
                        <span className="border border-white py-1 px-2 rounded-md">Universe</span>
                    </div>
                    <Button onClick={() => navigate(`/movies/${id}`)} className="grid grid-cols-2 items-center">Watch
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 mx-auto">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
                        </svg>
                    </Button>
                </div>
            </div>
    )
}

export default Banner;