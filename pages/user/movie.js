import { useState, useEffect } from 'react';
import axios from 'axios';

const movies = () => {
    const [userId, setUserId] = useState('');
    const [userMovieInfo, setUserMovieInfo] = useState({});

    useEffect(() => {
        const id = JSON.parse(localStorage.getItem('userId'));
      //   console.log(id);
        setUserId(id);
      }, [])

    const getMovieData = () => {
        let url = 'http://localhost:5000/api/user/find/' +userId;
        axios.get(url)
            .then((response) => {
                setUserMovieInfo(response.data.movie);
                // console.log(response);
                // setMovieList(response.data.movie);
            })
            .catch((error) => {
                console.log(error);
            })
    }
    useEffect(() => {
        getMovieData()
    }, [])
    return (
        <div className="flex flex-col justify-center items-center">
            <div className=" bg-white rounded-lg p-4 w-[70%] mt-10 shadow-md">
                <div className="">
                    <div className="grid grid-cols-3 gap-2">
                        <div className="rounded col-span-1 my-4">
                            <div>Favorite Movies : {userMovieInfo && userMovieInfo.name} </div>
                        </div>
                        
                    </div>
                </div>
            </div>
            <div className="flex w-full mt-6 mb-2 justify-center">
                <span>Movies Data</span>
            </div>
            <div className="">
                <div className="w-[90%] rounded-md">
                    <div className="grid grid-cols-7 mt-3 rounded-t-md bg-gray-50 p-3">
                        <div className="col-span">SL.NO</div>
                        <div className="col-span">NAME</div>
                        <div className="col-span mr-8">PRODUCER</div>
                        <div className="col-span">DIRECTOR</div>
                        <div className="col-span">HERO</div>
                        <div className="col-span">HEROINE</div>
                        <div className="col-span">ACTION</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default movies;