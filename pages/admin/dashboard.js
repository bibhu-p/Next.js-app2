import { BiEditAlt } from "react-icons/bi";
import axios from 'axios';
import { useState, useEffect } from 'react';

const AdminDashBoard = () => {

    const [adminData, setAdminData] = useState({})
    const [userData, setUserData] = useState([]);
    const [movieData, setMovieData] = useState([])

    const getData = () => {

        const token = JSON.parse(localStorage.getItem('authToken'));
        const adminDetails = JSON.parse(localStorage.getItem('loggedInData'));
        setAdminData(adminDetails);
        axios.get('http://localhost:5000/api/user/find', { headers: { 'auth-token': token } })
            .then((response) => {
                return setUserData(response.data.data);
            })
            .catch((error) => {
                return console.log(error);
            })
            console.log(userData);
    }

    useEffect(() => {
        getData()
        getMovieData()
    }, [])

    const getMovieData = () => {
        const token = JSON.parse(localStorage.getItem('authToken'));
        axios.get('http://localhost:5000/api/movie/find', { headers: { 'auth-token': token } })
            .then((response) => {
                return setMovieData(response.data);
            })
            .catch((error) => {
                return console.log(error);
            })
    }

    return (
        <div className="flex  justify-center items-baseline h-[100vh] w-[100vw] bg-[#F7FAFC]">
            <div className=" bg-white rounded-lg p-4 w-1/4  m-4 mt-10 shadow-md">
                <div className="border-b pb-2 flex flex-row justify-between">
                    <span className="text-xl"> Info</span>
                </div>
                    <div className="grid grid-cols-1 h-16 gap-2">
                        <div className="rounded col-span-1 my-4">
                            <div className="mb-2">Name : {adminData.name} </div>
                            <div className="mb-2">Email :{adminData.email} </div>
                        </div>
                    </div>
            </div>
            <div className=" bg-white rounded-lg p-4 w-1/4  m-4 mt-10 shadow-md">
                <div className="border-b pb-2 flex flex-row justify-between">
                    <span className="text-xl"> Users Info</span>
                </div>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="rounded col-span-1 my-4">
                            <div className="mb-2">No of Users : {userData.length}</div>
                        </div>
                    </div>
            </div>
            <div className=" bg-white rounded-lg p-4 w-1/4  m-4 mt-10 shadow-md">
                <div className="border-b pb-2 flex flex-row justify-between">
                    <span className="text-xl"> Movies Info</span>
                </div>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="rounded col-span-1 my-4">
                            <div className="mb-2">No of Movies : {movieData.length} </div>
                        </div>
                    </div>
            </div>
        </div>
    );
}
export default AdminDashBoard;