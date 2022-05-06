import { useState, useEffect } from 'react';
import axios from 'axios';
import { BiEditAlt } from "react-icons/bi";
import Modal from '../../components/Modal';
// import { useRouter } from 'next/router';

const UserDashBoard = () => {

    // const router = useRouter();

    // console.log(router);
    // const userInfo = router.query;
    // console.log(userInfo);
    const [userId, setUserId] = useState('');
    const [userInfo, setUserInfo] = useState({});
    const [showModal, setShowModal] = useState(false);
    const action = 'edit';

    // console.log(userData);
    useEffect(() => {
        //   console.log(token);
        // setUserId(id);
        getAllData() 
    }, [])

    const getAllData = () => {
        const id = JSON.parse(localStorage.getItem('userId'));
        let url = 'http://localhost:5000/api/user/find/' + id;

        // console.log(url);
        axios.get(url)
            .then((response) => {
                setUserInfo(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <div className="flex justify-center items-baseline  h-[100vh] w-[100vw] bg-[#F7FAFC]">
            <div className=" bg-white rounded-lg p-4 w-[70%] mt-10 shadow-md">
                <div className="border-b pb-2 flex flex-row justify-between">
                    <span className="text-xl"> User Info</span>
                    <button onClick={() => setShowModal(true)} ><BiEditAlt size={25} /></button>

                </div>
                <div className="">
                    <div className="grid grid-cols-3 gap-2">
                        <div className="rounded col-span-1 my-4">
                            <div className="mb-2">Name : {userInfo.name} </div>
                            <div>Email :{userInfo.email}  </div>
                        </div>
                        <div className="rounded col-span-1 my-4">
                            <div className="mb-2">Age :{userInfo.age} </div>
                            <div>Adhaar :{userInfo.adhaar} </div>
                        </div>
                        <div className="rounded col-span-1 my-4">
                            <div className="mb-2">Phone No :{userInfo.phone} </div>
                            <div>Address : {userInfo.address}</div>
                        </div>
                    </div>
                </div>
            </div>
            {showModal ? <Modal
                setShowModal={setShowModal}
                userInfo={userInfo}
                action={action}
            /> : null}
        </div>
    );
}

export default UserDashBoard;


