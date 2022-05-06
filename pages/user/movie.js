import { useState, useEffect } from 'react';
import axios from 'axios';
import { RiHeartAddLine } from 'react-icons/ri'

const Movie = () => {
    const [userId, setUserId] = useState('');
    const [userMovieInfo, setUserMovieInfo] = useState([]);
    const [movieData, setMovieData] = useState([]);
    const [showMovieData, setShowMovieData] = useState(false);

    useEffect(() => {
        getMovieData()
        getAllMovieData()
    }, [])

    const getMovieData = () => {
        const id = JSON.parse(localStorage.getItem('userId'));
        let url = 'http://localhost:5000/api/user/find/' + id;
        setUserId(id);
        axios.get(url)
            .then((response) => {
                setUserMovieInfo(response.data.movie);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const getAllMovieData = () => {
        const token = JSON.parse(localStorage.getItem('authToken'));

        axios.get('http://localhost:5000/api/movie/find', { headers: { 'auth-token': token } })
            .then((response) => {
                setMovieData(response.data);
            })
            .catch((error) => {
                return console.log(error);
            })
    }
    const addToFav = (movieId) => {
        let movieIds = [];
        movieIds.push(movieId)
        let url = 'http://localhost:5000/api/user/update/movie/' + userId;
        axios.put(url, movieIds)
            .then((response) => {
                getMovieData()
            })
            .catch((error) => {
                console.log(error);
            })
    }
    return (
        <div className="flex flex-col justify-center items-center">
            <div className=" bg-white rounded-lg p-4 w-[70%] mt-10 shadow-md">
                <div className="">
                    <div className="grid grid-cols-3 gap-2">
                        <div className="rounded col-span-1 my-4">
                            <div>Favorite Movies : {userMovieInfo.length} </div>
                        </div>
                    </div>
                    <p className="md:space-x-1 space-y-1 md:space-y-0 mb-4">
                        <button onClick={()=> showMovieData ? setShowMovieData(false): setShowMovieData(true)} className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" >
                           Show Details
                        </button>
                    </p>
                    <div className={showMovieData ?'':'hidden'}>
                        { userMovieInfo.map((data,i)=>
                            <div key={i} className="block p-6 mb-3 rounded-lg shadow-md grid grid-cols-2 bg-white">
                               <span className='col-span'>Name: {data.name}</span> 
                               <span className='col-span'>Hero: {data.hero}</span> 
                        </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="flex w-auto mt-6 mb-2 items-center">
                <span>Movies Data</span>
            </div>
            <div className="flex items-center">
                <div className="w-full p-3 rounded-md">
                    <div className="grid grid-cols-7 mt-3 rounded-t-md bg-gray-50 p-3">
                        <div className="col-span">SL.NO</div>
                        <div className="col-span">NAME</div>
                        <div className="col-span">PRODUCER</div>
                        <div className="col-span">DIRECTOR</div>
                        <div className="col-span">HERO</div>
                        <div className="col-span">HEROINE</div>
                        <div className="col-span">ACTION</div>
                    </div>
                    {movieData && movieData.map((data,i) =>
                        <div key={data._id} className="grid grid-cols-7 mt-3 border-b border-gray-400 py-2 ">
                            <div className="col-span">{i + 1}</div>
                            <div className="col-span">{data.name}</div>
                            <div className="col-span">{data.producer}</div>
                            <div className="col-span">{data.director}</div>
                            <div className="col-span">{data.hero}</div>
                            <div className="col-span">{data.heroine}</div>
                            <div className="col-span mx-5"><button onClick={() => addToFav(data._id)}><RiHeartAddLine /></button></div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Movie;