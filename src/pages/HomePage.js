import React, { Fragment } from 'react';
import MoviesList from '../components/movies/MoviesList';

const HomePage = () => {

    return (
        <Fragment> 
            <section className="movies-main page-container mb-10 text-white">
                <h2 className="capitalize mb-6 text-2xl font-bold">Now playing</h2>
                <MoviesList></MoviesList>
            </section>
            <section className="movies-main page-container mb-10 text-white">
                <h2 className="capitalize mb-6 text-2xl font-bold">Top Rated Movies</h2>
                <MoviesList type="top_rated"></MoviesList>
            </section>
            <section className="movies-main page-container mb-10 text-white">
                <h2 className="capitalize mb-6 text-2xl font-bold">Trending</h2>
                <MoviesList type="popular"></MoviesList>
            </section>
        </Fragment>
    );
};

export default HomePage;