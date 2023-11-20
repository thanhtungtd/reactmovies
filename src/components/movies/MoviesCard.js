import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../button/Button';
import { tmdbGetAPI } from '../../config';
import LoadingSkeleton from '../LoadingSkeleton';

const MoviesCard = ({item}) => {
  const { title, vote_average, release_date, poster_path, id } = item;
  const navigate = useNavigate();
  
    return (
      <div className="movies-card flex flex-col h-full rounded-xl bg-slate-900 p-3 mb-5 select-none">
        <img src={tmdbGetAPI.imageW500(poster_path)}
          className="w-full h-[240px] object-cover rounded-md mb-3" 
            alt=""/>

        <div className="flex flex-col flex-1">
          <h3 className="font-bold text-lg mb-2">{title}</h3>
            <div className="flex items-center justify-between text-sm opacity-70 mb-3">
              <span>{new Date(release_date).getFullYear()}</span>
              <span>{vote_average}</span>
            </div>
            <Button onClick={() => navigate(`/movies/${id}`)} className="w-full">Watch now</Button>
              {/* <button onClick={() => navigate(`/movies/${id}`)} 
                      className="bg-primary w-full py-3 px-5 font-bold rounded-lg mt-auto text-lg">Watch now
              </button> */}
            </div>
      </div>
    );
};

export default MoviesCard;

export const MovieCardSkeleton = () => {
  return (
    <div className="movies-card flex flex-col h-full rounded-xl bg-slate-900 p-3 mb-5 select-none opacity-20">
        <LoadingSkeleton width="100%" height="240px" radius="8px" className="mb-3"></LoadingSkeleton>

        <div className="flex flex-col flex-1">
          <h3 className="font-bold text-lg mb-2">
            <LoadingSkeleton width="100%" height="20px"></LoadingSkeleton>
          </h3>
            <div className="flex items-center justify-between text-sm opacity-70 mb-3">
              <span><LoadingSkeleton width="50px" height="10px"></LoadingSkeleton></span>
              <span><LoadingSkeleton width="30px" height="10px"></LoadingSkeleton></span>
            </div>
            <LoadingSkeleton width="100%" height="52px" radius="6px"></LoadingSkeleton>
            {/* <Button className="w-full bg-primary bg-opacity-40">Watch now</Button> */}
              
            </div>
      </div>
  )
}