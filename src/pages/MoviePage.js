import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { fetcher } from '../config';
import MoviesCard, { MovieCardSkeleton } from '../components/movies/MoviesCard';
import useDebounce from '../hooks/useDebounce';
import ReactPaginate from 'react-paginate';
import {v4} from "uuid";



// https://api.themoviedb.org/3/search/movie?api_key=
const pageCount = 5;
const itemsPerPage = 20;

const MoviePage = () => {

    const [pageCount, setPageCount] = useState(0)
    const [itemOffset, setItemOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState("");
    const [url, setUrl] = useState(`https://api.themoviedb.org/3/movie/popular?api_key=e19297dd210c0b9fcb582119bbdd0e29&page=${currentPage}`);
    const filterDebounce = useDebounce(filter, 500);
    const handleFilterChange = (e) => {
        setFilter(e.target.value)
    };
    const { data, error } = useSWR(url, fetcher);
    const loading = !data && !error;
    useEffect(() => {
        if(filterDebounce) {
            setUrl(`https://api.themoviedb.org/3/search/movie?api_key=e19297dd210c0b9fcb582119bbdd0e29&query=${filterDebounce}&page=${currentPage}`);
        }else{
            setUrl(`https://api.themoviedb.org/3/movie/popular?api_key=e19297dd210c0b9fcb582119bbdd0e29&page=${currentPage}`);
        }
    }, [filterDebounce, currentPage]);
    const movies = data?.results || [];
    // (Phân trang--------------------------------------------)
    useEffect(() => {
        if(!data || !data.total_pages) return;
        setPageCount(Math.ceil(data.total_results / itemsPerPage));
    }, [data, itemOffset])

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data.total_pages;
        setItemOffset(newOffset);
        setCurrentPage(event.selected + 1);
    };

    return (
        <div>
            <div className='flex my-5 rounded-xl overflow-hidden mt-20'>
                <div className='flex-1'>
                    <input type='text' className="w-full py-3 px-10 bg-white bg-opacity-30 outline-none cursor-text" placeholder='Type here to search . . .'
                        onChange={handleFilterChange}></input>
                </div>
                <button className='py-2 px-4 bg-secondary'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-white font-medium">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </button>
            </div>
            {/* {loading && <div className="flex w-full animate-bounce justify-center">
                <div className="mx-3 h-5 w-5 w-10 rounded-full bg-purple-800 animate-ping"></div>
                <div className="mx-3 h-5 w-5 w-10 rounded-full bg-purple-600 animate-ping"></div>
                <div className="mx-3 h-5 w-5 w-10 rounded-full bg-purple-400 animate-ping"></div>
            </div>} */}
            {loading && <div className="grid grid-cols-5 gap-10">
                {new Array(itemsPerPage).fill(0).map(() => (
                    <MovieCardSkeleton key={v4()}></MovieCardSkeleton>
                ))}
                </div>
            }
            <div className="grid grid-cols-5 gap-10 text-white">
                {!loading && 
                    movies.length > 0 && movies.map(item => (
                        <MoviesCard key={item.id} item={item}></MoviesCard>
                ))}
            </div>

            <div className="mt-10">
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="Next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="< Prev"
                    renderOnZeroPageCount={null}
                    className="pagination"
                />
            </div>

            {/* <div className="flex items-center justify-center mt-10 mb-5 gap-x-5 hidden">
                <span className="cursor-pointer"
                    onClick={() => setCurrentPage(currentPage - 1)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
                    </svg>
                </span>
                
                {new Array(pageCount).fill(0).map((item, index) => (
                    <span className="cursor-pointer bg-white text-slate-700 py-2 px-4 rounded-md inline-block leading-none"
                        onClick={() => setCurrentPage(index + 1)}>
                        {index + 1}
                    </span>
                ))}
                
                <span className="cursor-pointer"
                    onClick={() => setCurrentPage(currentPage + 1)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                    </svg>
                </span>
            </div> */}
        </div>
    );
};

export default MoviePage;