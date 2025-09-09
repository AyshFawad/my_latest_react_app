import { useState,useEffect } from 'react'
import './App.css'
import Search from './Components/Search'
import MovieCard from './Components/MovieCard';
const API_BASE_URL ="https://api.themoviedb.org/3";

const API_KEY = import.meta.env.VITE_TMBD_API_KEY;
console.log(API_KEY);

const API_OPTIONS ={
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization : 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMWFjMzA5ZjAxYjNkNjk5ZDhlZWExMDY1MTM3M2IxNiIsIm5iZiI6MTc1NzM3MTIwOS4xMTMsInN1YiI6IjY4YmY1YjQ5ODU3YjkxYTRjMThjZjkwZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.75zHm4RwpSX8nsY7licSk2-CJT8F3bzp8Ee9JzbNfvU'
  }

}
function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState ([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchMovies = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by+popularity.desc`
      const response = await fetch(endpoint, API_OPTIONS);
    

      if(!response.ok){
        throw new Error('Failed to fetch movies')
      }
      const data = await response.json();
      if (data.Response ==='False'){
        setErrorMessage(data.Error|| 'Failed to fetch movies');
        setMovieList ([]);
      }
      setMovieList(data.results || []);
      console.log(data); 
    } catch (error) {
      console.error(`Error fetching movies:${error}`);
      setErrorMessage('Error fetching movies. Please try again later');
    } finally {
      setIsLoading(false);
    }
    
  }
  useEffect(()=>{
    fetchMovies();
  },[])
  return (
    <main>
    <div className='pattern'></div>
    <div className='wrapper'>
      <header>
        
        <img src="./hero-img.png" alt="Hero image"/>
        <h1> Find <span className='text-gradient'> Movies</span> You'll Enjoy without the Hassle </h1>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </header>
      <section className='all-movies'>
        <h2 className='mt-[20px]'>All Movies</h2>
        {isLoading ? (
          <p className='text-white'>Loading...</p>
        ) : errorMessage ? (
          
          <p className='text-red-500'>{errorMessage}</p>
        ) : (
          <ul>
            {movieList.map((movie)=>(
              <MovieCard key={movie.id} movie = {movie}/>
                       ))}
          </ul>
        )}
      
      </section>
  
    </div>
    </main>
  )
}

export default App

