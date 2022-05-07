import { useState, useEffect } from 'react';
import axios from 'axios';

const MovieModal = (props) => {

    const [regFormValues, setRegFormValues] = useState({
        name: '',
        producer: '',
        director: '',
        hero: '',
        heroine: '',
    });

    const [regFormErr, setRegFormErr] = useState({
        name: false,
        producer: false,
        director: false,
        hero: false,
        heroine: false,
    })
    useEffect(() => {
        if (props.action === "edit") {
            setRegFormValues(props.movieInfo);
        }
    }, [props.action])

    const classes = {
        valid: "transition ease-in-out focus:duration-300 border-0 px-3 text-[0.9rem] rounded bg-gray-300 mt-2 w-full h-9 outline-0 focus:ring-gray-800 focus:ring-1",
        inValid: "transition ease-in-out focus:duration-300 border-0 px-3 text-[0.9rem] rounded bg-gray-300 mt-2 outline-0 w-full h-9 ring-1 ring-red-400 focus:ring-red-400 focus:ring-1"
    }
    const onAdd = () => {

        if (!regFormValues.name) {
            setRegFormErr({ ...regFormErr, name: true })
            return;
        }
        if (!regFormValues.producer) {
            setRegFormErr({ ...regFormErr, producer: true })
            return;
        }
        if (!regFormValues.director) {
            setRegFormErr({ ...regFormErr, director: true })
            return;
        }
        if (!regFormValues.hero) {
            setRegFormErr({ ...regFormErr, hero: true })
            return;
        }
        if (!regFormValues.heroine) {
            setRegFormErr({ ...regFormErr, heroine: true })
            return;
        }
        const token = JSON.parse(localStorage.getItem('authToken'));
        const headers = {
            headers: {
                'auth-token': token
            }
        }

        switch (props.action) {
            case 'add': {
                let url = 'http://localhost:5000/api/movie/create';
                axios.post(url, regFormValues, headers)
                    .then((res) => {
                        // console.log(res.data);
                        // setSpinner(false)
                        props.getMovieData()
                        clear()
                        props.setMovieModalVisible(false)
                    }).catch(err => {
                        console.log('user create error--->>>', err)
                    })
            }
            case 'edit': {
                let url = 'http://localhost:5000/api/movie/update/' + movieDetails._id;
                axios.put(url, regFormValues, headers)
                    .then((res) => {
                        // console.log(res.data);
                        // setSpinner(false)
                        props.getMovieData()
                        props.setMovieModalVisible(false)
                        clear()
                    }).catch(err => {
                        console.log('movie create error--->>>', err)
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
                                    {props.action === 'add' ? 'Add Movie ' : 'Edit Movie'}
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
                                                <div className="text-gray-800 font-semibold  ">Producer</div>
                                                <div className='flex'>
                                                    <input
                                                        type={'text'}
                                                        id="producer"
                                                        name="producer"
                                                        autoComplete=''
                                                        disabled={props.action === 'edit' ? true : false}
                                                        value={regFormValues.producer}
                                                        onChange={(e) => { setRegFormErr({ ...regFormErr, producer: false }); setRegFormValues({ ...regFormValues, producer: e.target.value }) }}
                                                        className={regFormErr.producer ? classes.inValid : classes.valid}
                                                    />
                                                </div>
                                            </div>
                                            <div className='m-2 px-2'>
                                                <div className="text-gray-800 font-semibold">Director</div>
                                                <div className='flex '>
                                                    <input
                                                        type={'text'}
                                                        name="director"
                                                        autoComplete=''
                                                        value={regFormValues.director}
                                                        onChange={(e) => { setRegFormErr({ ...regFormErr, director: false }); setRegFormValues({ ...regFormValues, director: e.target.value }) }}
                                                        className={regFormErr.director ? classes.inValid : classes.valid} />
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div className='sm:col-span-1 col-span-2'>
                                        <div>
                                            <div className='m-2 px-2'>
                                                <div className="text-gray-800 font-semibold ">Hero</div>
                                                <div className='flex'>
                                                    <input
                                                        type={'text'}
                                                        name="hero"
                                                        autoComplete=''
                                                        value={regFormValues.hero}
                                                        onChange={(e) => { setRegFormErr({ ...regFormErr, hero: false }); setRegFormValues({ ...regFormValues, hero: e.target.value }) }}
                                                        className={regFormErr.hero ? classes.inValid : classes.valid} />
                                                </div>
                                            </div>
                                            <div className='m-2  px-2'>
                                                <div className="text-gray-800 font-semibold ">Heroine</div>
                                                <div className='flex '>
                                                    <input
                                                        type={'text'}
                                                        name="heroine"
                                                        autoComplete=''
                                                        value={regFormValues.heroine}
                                                        onChange={(e) => { setRegFormErr({ ...regFormErr, heroine: false }); setRegFormValues({ ...regFormValues, heroine: e.target.value }) }}
                                                        className={regFormErr.heroine ? classes.inValid : classes.valid} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button onClick={() => onAdd()} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-800 text-base font-medium text-white hover:bg-gray-700 focus:outline-none  focus:ring-gray-500 sm:ml-3 sm:w-auto sm:text-sm">
                                {props.action === 'add' ? 'Add ' : 'Update'}
                            </button>
                            <button onClick={() => props.setMovieModalVisible(false)} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieModal;