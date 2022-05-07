import { useState } from 'react';
import axios from 'axios';
import Modal from '../components/Modal';
import { FaRegUser } from 'react-icons/fa';
import { RiLockPasswordLine } from 'react-icons/ri';
import { useRouter } from 'next/router';
const Home = () => {

  const router = useRouter()
  const [loginType, setLoginType] = useState(false);
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
    valid: "flex pl-3 items-center transition ease-in-out focus:duration-300 border-0  text-[0.9rem] rounded  md:mx-8  w-full md:w-[85%] h-9 outline-0 focus:ring-gray-800 ring-1 ring-gray-800",
    inValid: "flex pl-3 items-center transition ease-in-out focus:duration-300 border-0  text-[0.9rem] rounded outline-0 md:mx-8  w-full md:w-[85%] h-9 ring-1 ring-red-400 focus:ring-red-400 focus:ring-1"
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

    if (loginType) {
      axios.post('http://localhost:5000/api/admin/login', formValues)
        .then(function (response) {
          // setSpinner(false)
          let type = 'admin';
          localStorage.setItem("loggedInData", JSON.stringify(response.data.data));
          localStorage.setItem("authToken", JSON.stringify(response.data.token));
          localStorage.setItem("userType", type);
          console.log(response);
          clear()
          router.push("/admin/dashboard");

        })
        .catch( (error) => {
          // setSpinner(false)
          clear()
          return console.log(error);
        })
    }else{
      axios.post('http://localhost:5000/api/user/login', formValues)
        .then(function (response) {
          // setSpinner(false)
          let type = 'user';
          localStorage.setItem("userId", JSON.stringify(response.data.data._id));
          localStorage.setItem("authToken", JSON.stringify(response.data.token));
          localStorage.setItem("userType", JSON.stringify(type));
          console.log(response);
          router.push('/user/dashboard')
          clear()

        })
        .catch((error) => {
          // setSpinner(false)
          clear()
          return console.log(error);
        });
    }
  }


  return (
    <div className='flex flex-col md:flex-row  justify-center items-center  h-[100vh] w-[100vw] bg-[#ffffff]'>
      {/* Logo */}
      <div className="flex justify-center items-center w-[30%] h-[25%] md:w-1/4 md:h-1/2 md:border-r-2 border-r-slate-800">
        <img className=' w-full md:h-full h-full md:w-full' src="https://i.pinimg.com/736x/cb/54/a9/cb54a9d5a7815b1536185bab2c9fe5e7.jpg" alt="" />
      </div>

      {/* Login Form */}
      <div className=" -mt-5 md:mt-16 w-auto md:w-auto h-[60%] sm:bg-white mx-3">
        <div className=' flex justify-center items-center sm:h-18 rounded-xl sm:bg-white '>
          <span className=' text-3xl '> Login </span>
        </div>
        <div className='flex flex-row justify-evenly mt-3 p-1'>
          <div className="">
            <input className="" type="radio" name="flexRadioDisabled" onChange={(e) => setLoginType(true)} />
            <label className="" >
              ADMIN
            </label>
          </div>
          <div className="">
            <input className="" type="radio" name="flexRadioDisabled" onChange={(e) => setLoginType(false)} defaultChecked />
            <label className="">
              USER
            </label>
          </div>
        </div>
        <div className=' p-6 justify-center items-center sm:bg-white'>
          <div className={formErr.email ? classes.inValid : classes.valid}>
            <FaRegUser size={15} className='  ' />
            <input
              type={'text'}
              id="email"
              name="email"
              autoComplete=''
              value={formValues.email}
              onChange={(e) => { setFormErr({ ...formErr, email: false }); setFormValues({ ...formValues, email: e.target.value }) }}
              className=' border-0 bg-white outline-0 w-full px-2'
            />
          </div>

          <div className='mt-5'>
            <div className={formErr.pwd ? classes.inValid : classes.valid}>
              <RiLockPasswordLine size={18} className='' />
              <input
                type={'password'}
                value={formValues.password}
                onChange={(e) => { setFormErr({ ...formErr, pwd: false }); setFormValues({ ...formValues, password: e.target.value }) }}
                className='border-0 bg-white outline-0 w-full px-2'
                name="password"
                id="password" />
            </div>
          </div>
          <button className=" float-right h-6 text-gray-800 text-xs">Forgot password?</button>
          <div className="flex justify-center align-center mt-8 w-full ">
            <button onClick={() => onLogin()} className='bg-gray-800 w-[6rem] ring-1 ring-gray-800 h-10 text-white rounded-md hover:bg-gray-500 flex justify-center items-center font-semibold transition ease-in-out hover:duration-300'>
              Login
            </button>
          </div>
          <div className="mt-4 text-center text-gray-500">New User?<button onClick={() => { setShowModal(true); }} className='sm:mx-3 text-sm sm:text-base md:text-md'>Register</button></div>
        </div>
      </div>
      {showModal ? <Modal
        setShowModal={setShowModal}
        // getData={getData}
        action={action}
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