import { useState , useEffect } from 'react';
import { FaRegUser } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/router';

const NavBar = () => {

    const [loginType, setLoginType] = useState('');
    const router = useRouter();
    const [dropDown, setDropDown] = useState(false);
    const css = {
        open: 'origin-top-right fixed right-0 mt-2 w-24 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none',
        close: 'hidden'
    }

    useEffect(() => {
        const userType = JSON.parse(localStorage.getItem('userType'));
        setLoginType(userType)
    }, [])

    const onLogout = () => {
        localStorage.clear();
        router.push('/')
    }
    return (
        <nav className="bg-gray-800 sticky top-0 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 ">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <img className="h-10 w-10 rounded-lg" src="https://i.pinimg.com/736x/cb/54/a9/cb54a9d5a7815b1536185bab2c9fe5e7.jpg" alt="Workflow" />
                        </div>
                        <div >
                            <div className="ml-10 flex items-baseline space-x-4">
                                {loginType === 'user' ?
                                    <>
                                    <Link href={'/user/dashboard'}>
                                        <button className=" text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Dashboard</button>
                                    </Link>
                                    <Link href={'/user/movie'}>
                                        <button className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Movies</button>
                                    </Link>
                                    </>
                                    :
                                    <>  
                                    <Link href={'/admin/dashboard'}>
                                        <button className=" text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Dashboard</button>
                                    </Link>
                                    <Link href={'/admin/users'}>
                                        <button className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Users</button>
                                    </Link>
                                    <Link href={'/admin/movies'}>
                                        <button className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Movies</button>
                                    </Link>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div className="ml-4 flex items-center md:ml-6">
                            <div className="ml-3 relative">
                                <div>
                                    <button onClick={() => { dropDown ? setDropDown(false) : setDropDown(true) }} className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-gray-800 ">
                                        <div className="h-8 w-8 rounded-full flex p-1 align-center justify-center"> <FaRegUser color='white' size={20} /></div>
                                    </button>
                                </div>
                                <div className={dropDown ? css.open : css.close}>
                                    {/* <button className="block px-4 py-2 text-sm text-gray-700">Profile</button> */}
                                    <button className="block px-4 py-2 text-sm text-gray-700" onClick={() => onLogout()}>Logout</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;