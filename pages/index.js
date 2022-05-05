import { useState } from 'react';
import axios from 'axios';
import Modal from '../components/Modal';
import { FaRegUser } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import {useRouter} from 'next/router';
const Home = () => {

  const router = useRouter()
  // const [loginType, setLoginType] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const action = 'add';
  const [formValues, setFormValues] = useState({
    email: '',
    password: ''
  });
  const [formErr, setFormErr] = useState({
    email: false,
    pwd: false
  });

  const classes = {
    valid: "transition ease-in-out focus:duration-300 border-0 px-3 text-[0.9rem] rounded-[3px] bg-gray-100 mt-2 w-[75%] h-8 focus:ring-gray-700 focus:ring-1",
    inValid: "transition ease-in-out focus:duration-300 border-0 px-3 text-[0.9rem] rounded-[3px] bg-gray-100 mt-2 w-[75%] h-8 ring-1 ring-red-400 focus:ring-red-400 focus:ring-1"
  }

  const clear = () => {
    setFormValues({ ...formValues, email: '', password: '' });
  }

  const onLogin = () => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!formValues.email) {
      setFormErr({ ...formErr, email: true })
      return;
    } else if (!regex.test(formValues.email)) {
      setFormErr({ ...formErr, email: true })
      return;
    }
    if (!formValues.password) {
      setFormErr({ ...formErr, pwd: true })
      return;
    }
    axios.post('http://localhost:5000/api/user/login', formValues)
      .then(function (response) {
        // setSpinner(false)
        clear()
        // let type = 'user';
        localStorage.setItem("userId", JSON.stringify(response.data.data._id));
        // localStorage.setItem("authToken", JSON.stringify(response.data.token));
        // localStorage.setItem("userType", JSON.stringify(type));
        console.log(response);
        // navigate("/user/dashboard");
        router.push('/user/dashboard')

      })
      .catch(function (error) {
        // setSpinner(false)
        clear()
        return console.log(error);
      });
  }


  return (
    <div className='flex justify-center items-center  h-[100vh] w-[100vw] bg-[#f6f6f7]'>
      <div className=" w-[30vw] h-[70%] bg-slate-200 rounded-xl shadow-md">
        <div className=' flex justify-center items-center h-40 rounded-xl bg-slate-200'>

        </div>
        <div className=' p-6 justify-center items-center bg-slate-200 rounded-t-xl'>
          <div className="flex justify-center align-center ">
            <FaRegUser size={20} className=' mr-2 mt-3' />
            <input
              type={'text'}
              id="email"
              name="email"
              value={formValues.email}
              onChange={(e) => { setFormErr({ ...formErr, email: false }); setFormValues({ ...formValues, email: e.target.value }) }}
              className={formErr.email ? classes.inValid : classes.valid}
            />
          </div>
          <div className='flex justify-center align-center mt-4'>
            <RiLockPasswordFill size={20} className=' mr-2 mt-3' />
            <input
              type={'password'}
              value={formValues.password}
              onChange={(e) => { setFormErr({ ...formErr, pwd: false }); setFormValues({ ...formValues, password: e.target.value }) }}
              className={formErr.pwd ? classes.inValid : classes.valid}
              name="password"
              id="password" />
          </div>
          <button className=" float-right h-6 text-gray-800 mt-1 text-xs">Forgot password?</button>
          <div className="flex justify-center align-center mt-8 w-full ">
            <button onClick={() => onLogin()} className='bg-gray-600 w-[6rem] h-10 text-white rounded-md hover:bg-gray-800 flex justify-center items-center font-semibold transition ease-in-out hover:duration-300'>
              Login
            </button>
          </div>
          <div className="mt-6 text-center text-gray-500">New User?<button onClick={()=>{setShowModal(true); }} className='mx-3'>Register</button></div>
          

      {/* <div className=" bg-orange-200 min-w-[25rem] px-5 py-5 absolute right-0 bottom-8  shadow-md rounded-md border-x-4 border-x-orange-800 ">
        <span> ! </span>
        <span> Warning</span>
      </div> */}
        </div>
      </div>
      {showModal ? <Modal
        setShowModal={setShowModal}
        getData={getData}
        action= {action}
      /> : null}

    </div>
  );
}

export default Home;

Home.getLayout = function PageLayout(page) {
  return (
    <>
      {page}
    </>
  )
}