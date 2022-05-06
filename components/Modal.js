import { useState, useEffect } from 'react';
import axios from 'axios';

const Modal = (props) => {

    const [regFormValues, setRegFormValues] = useState({
        name: '',
        email: '',
        password: '',
        age: '',
        adhaar: '',
        phone: '',
        address: ''
    });
    const [regFormErr, setRegFormErr] = useState({
        name: false,
        email: false,
        pwd: false,
        age: false,
        adhaar: false,
        phone: false,
        address: false
    })
    useEffect(() => {
        if (props.action === "edit") {
            setRegFormValues(props.userInfo);
            // console.log('edit mode, data---->>>', userDetails)
        }
    }, [props.action])
    const classes = {
        valid: "transition ease-in-out focus:duration-300 border-0 px-3 text-[0.9rem] rounded bg-gray-300 mt-2 w-full h-9 outline-0 focus:ring-gray-800 focus:ring-1",
        inValid: "transition ease-in-out focus:duration-300 border-0 px-3 text-[0.9rem] rounded bg-gray-300 mt-2 outline-0 w-full h-9 ring-1 ring-red-400 focus:ring-red-400 focus:ring-1"
    }
    const clear = () => {
        setRegFormValues({
            ...regFormValues,
            name: '',
            email: '',
            password: '',
            age: '',
            adhaar: '',
            phone: '',
            address: ''
        });
    }
    const onAdd = () => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        if (!regFormValues.name) {
            setRegFormErr({ ...regFormErr, name: true })
            return;
        }
        if (!regFormValues.email) {
            setRegFormErr({ ...regFormErr, email: true })
            return;
        } else if (!regex.test(regFormValues.email)) {
            setRegFormErr({ ...regFormErr, email: true })
            return;
        }
        if (!regFormValues.password) {
            setRegFormErr({ ...regFormErr, pwd: true })
            return;
        }
        if (!regFormValues.age) {
            setRegFormErr({ ...regFormErr, age: true })
            return;
        }
        if (!regFormValues.phone) {
            setRegFormErr({ ...regFormErr, phone: true })
            return;
        }
        if (!regFormValues.adhaar) {
            setRegFormErr({ ...regFormErr, adhaar: true })
            return;
        }
        if (!regFormValues.address) {
            setRegFormErr({ ...regFormErr, address: true })
            return;
        }
        console.log(regFormValues);

        switch (props.action) {
            case 'add': {
                let url = 'http://localhost:5000/api/user/register';
                axios.post(url, regFormValues)
                    .then((res) => {
                        console.log(res.data);
                        // setSpinner(false)
                        props.getData()
                        clear()
                        props.setShowModal(false)
                    }).catch(err => {
                        console.log('user create error--->>>', err)
                    })
            }
            case 'edit': {
                let url = 'http://localhost:5000/api/user/update/' + props.userInfo._id;
                axios.put(url, regFormValues)
                    .then((res) => {
                        console.log(res.data);
                        // setSpinner(false)
                        props.getData()
                        props.setShowModal(false)
                        clear()
                    }).catch(err => {
                        console.log('user create error--->>>', err)
                    })
            }
            default: {
                break;
            }
        }
    }
    return (

        <div className="relative z-10">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                    <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-auto">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-4 sm:pb-4">
                            <div className="sm:flex flex-col sm:items-center">
                                <div className=' border-b-2 p-1 mb-4 w-full text-xl'>
                                    {props.action === 'add' ? 'Add User ' : 'Edit User'}
                                </div>
                                {/* Modal Body */}
                                <div className='grid grid-cols-2 gap-2'>

                                    <div className='sm:col-span-1 col-span-2'>
                                        <div>
                                            <div className='px-2 m-2'>
                                                <div className="text-gray-800 font-semibold ">Name</div>
                                                <div className='flex '>
                                                    <input
                                                        type={'text'}
                                                        id="name"
                                                        name="name"
                                                        autoComplete=''
                                                        value={regFormValues.name}
                                                        onChange={(e) => { setRegFormErr({ ...regFormErr, name: false }); setRegFormValues({ ...regFormValues, name: e.target.value }) }}
                                                        className={regFormErr.name ? classes.inValid : classes.valid}
                                                    />
                                                </div>
                                            </div>
                                            <div className='m-2 px-2'>
                                                <div className="text-gray-800 font-semibold  ">Email</div>
                                                <div className='flex'>
                                                    <input
                                                        type={'text'}
                                                        id="email"
                                                        name="email"
                                                        autoComplete=''
                                                        disabled= {props.action === 'edit' ? true: false}
                                                        value={regFormValues.email}
                                                        onChange={(e) => { setRegFormErr({ ...regFormErr, email: false }); setRegFormValues({ ...regFormValues, email: e.target.value }) }}
                                                        className={regFormErr.email ? classes.inValid : classes.valid}
                                                    />
                                                </div>
                                            </div>
                                            <div className='m-2 px-2'>
                                                <div className="text-gray-800 font-semibold">Password</div>
                                                <div className='flex '>
                                                    <input
                                                        type={'password'}
                                                        id="password"
                                                        name="password"
                                                        autoComplete=''
                                                        value={regFormValues.password}
                                                        onChange={(e) => { setRegFormErr({ ...regFormErr, pwd: false }); setRegFormValues({ ...regFormValues, password: e.target.value }) }}
                                                        className={regFormErr.pwd ? classes.inValid : classes.valid}
                                                    />
                                                </div>
                                            </div>
                                            <div className='m-2 px-2'>
                                                <div className="text-gray-800 font-semibold ">Age</div>
                                                <div className='flex'>
                                                    <input
                                                        type={'text'}
                                                        id="age"
                                                        name="age"
                                                        autoComplete=''
                                                        value={regFormValues.age}
                                                        onChange={(e) => { setRegFormErr({ ...regFormErr, age: false }); setRegFormValues({ ...regFormValues, age: e.target.value }) }}
                                                        className={regFormErr.age ? classes.inValid : classes.valid}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='sm:col-span-1 col-span-2'>
                                        <div>
                                            <div className='m-2  px-2'>
                                                <div className="text-gray-800 font-semibold ">Phone</div>
                                                <div className='flex '>
                                                    <input
                                                        type={'text'}
                                                        id="phone"
                                                        name="phone"
                                                        autoComplete=''
                                                        value={regFormValues.phone}
                                                        onChange={(e) => { setRegFormErr({ ...regFormErr, phone: false }); setRegFormValues({ ...regFormValues, phone: e.target.value }) }}
                                                        className={regFormErr.phone ? classes.inValid : classes.valid}
                                                    />
                                                </div>
                                            </div>
                                            <div className='m-2 px-2'>
                                                <div className="text-gray-800 font-semibold">Adhaar</div>
                                                <div className='flex '>
                                                    <input
                                                        type={'text'}
                                                        id="adhaar"
                                                        name="adhaar"
                                                        autoComplete=''
                                                        value={regFormValues.adhaar}
                                                        onChange={(e) => { setRegFormErr({ ...regFormErr, adhaar: false }); setRegFormValues({ ...regFormValues, adhaar: e.target.value }) }}
                                                        className={regFormErr.adhaar ? classes.inValid : classes.valid}
                                                    />
                                                </div>
                                            </div>

                                            <div className='m-2 px-2'>
                                                <div className="text-gray-800 font-semibold ">Address</div>
                                                <div className='flex '>
                                                    <input
                                                        type={'text'}
                                                        id="address"
                                                        name="address"
                                                        autoComplete=''
                                                        value={regFormValues.address}
                                                        onChange={(e) => { setRegFormErr({ ...regFormErr, address: false }); setRegFormValues({ ...regFormValues, address: e.target.value }) }}
                                                        className={regFormErr.address ? classes.inValid : classes.valid}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button onClick={() => onAdd()} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-800 text-base font-medium text-white hover:bg-gray-700 focus:outline-none  focus:ring-gray-500 sm:ml-3 sm:w-auto sm:text-sm">
                                {props.action === 'add' ? 'Register ' : 'Update'}
                            </button>
                            <button onClick={() => props.setShowModal(false)} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;