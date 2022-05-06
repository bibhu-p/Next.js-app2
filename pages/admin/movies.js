import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBinLine, RiAddBoxLine } from "react-icons/ri";
import axios from 'axios';
import { useState, useEffect } from 'react';
const Movies = () => {

    const [movieData, setMovieData] = useState([]);
    const [movieModalVisible, setMovieModalVisible] = useState(false);
    const [action, setAction] = useState('add');
    const [authToken, setAuthToken] = useState('');


    const getMovieData = () => {

        const token = JSON.parse(localStorage.getItem('authToken'));
        setAuthToken(token)
        axios.get('http://localhost:5000/api/movie/find', { headers: { 'auth-token': token } })
            .then((response) => {
                return setMovieData(response.data);
            })
            .catch((error) => {
                return console.log(error);
            })
    }
    useEffect(() => {
        getMovieData()
    }, [])

    const viewData = (movieId) => {
        // setIndex(i)
        setAction('edit')
        setMovieModalVisible(true)
    }
    const onDelete = (movieId) => {

        let url = 'http://localhost:5000/api/movie/delete/' + movieId;
        axios.delete(url, { headers: { 'auth-token': authToken } })
          .then((response) => {
            getMovieData()
            return console.log(response);
          })
          .catch((error) => {
            return console.log(error);
          })
      }
    return (
        <div className="flex flex-col items-center ">
            <div className=" mt-6 w-full flex justify-end ">
                <button className="mr-16 bg-gray-600 w-[4rem] h-10 text-white rounded-md hover:bg-gray-800 flex justify-center items-center font-semibold transition ease-in-out hover:duration-300"><RiAddBoxLine size={25} /></button>
            </div>

            <div className="w-[90%] rounded-md">
                <div className="grid grid-cols-7 gap-3 mt-3 rounded-t-md bg-gray-50 p-3">
                    <div className="col-span">SL.NO</div>
                    <div className="col-span">NAME</div>
                    <div className="col-span">PRODUCER</div>
                    <div className="col-span">DIRECTOR</div>
                    <div className="col-span">HERO</div>
                    <div className="col-span">HEROINE</div>
                    <div className="col-span">ACTION</div>
                </div>

                {movieData && movieData.map((data, i) =>
                    <div key={i} className="grid grid-cols-7 gap-2 mt-3 p-3 border-b border-gray-400 ">
                        <div className="col-span">{i + 1}</div>
                        <div className="col-span">{data.name}</div>
                        <div className="col-span">{data.producer}</div>
                        <div className="col-span">{data.director}</div>
                        <div className="col-span">{data.hero}</div>
                        <div className="col-span">{data.heroine}</div>
                        <div className="col-span"><button onClick={() => viewData(data._id)}><BiEditAlt size={20} /></button> <button className=" mx-2.5" onClick={() => onDelete(data._id)}><RiDeleteBinLine size={20} /></button></div>
                    </div>
                )}
            </div>

            {/* Modal  */}
            {/* {showModal ? <AllModal
        setShowModal={setShowModal}
        getData={getData}
        action= {action}
      /> : null} */}
        </div>
    );
}

export default Movies;