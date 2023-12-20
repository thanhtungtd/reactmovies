import { Fragment, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
// import { NavLink } from "react-router-dom";
import "swiper/scss";
import Main from "./components/layout/Main";
import Banner from "./components/banner/Banner";
import MoviePageV2 from "./pages/MoviePageV2";
// import HomePage from "./pages/HomePage";
// import MoviePage from "./pages/MoviePage";
import ScrollButton from "./components/button/ScrollButton";
// import MoviesDetailsPage from "./pages/MoviesDetailsPage";
const HomePage = lazy(() => import("./pages/HomePage"));
// const MoviePage = lazy(() => import("./pages/MoviePage"));
const MoviesDetailsPage = lazy(() => import("./pages/MoviesDetailsPage"));


function App() {
  return (
    <Fragment>
      <ScrollButton></ScrollButton>
      <Suspense fallback={<></>}>     {/*Khi trang chưa load sẽ trống <></>*/}
        <Routes>
          <Route element={<Main></Main>}>
            <Route path="/" element={
              <>
                <Banner></Banner>
                <HomePage></HomePage>
              </>
              }>
            </Route>
            <Route path="/movies" element={<MoviePageV2></MoviePageV2>}></Route>
            <Route path="/movies/:movieId" element={<MoviesDetailsPage></MoviesDetailsPage>}></Route>
          </Route>
        </Routes>
      </Suspense>
    </Fragment>
  );
}

export default App;
