import { useState } from 'react';
import { FaRegUser } from 'react-icons/fa';
import Link from 'next/link';

const NavBar = () => {

    const [dropDown, setDropDown] = useState(false);
    const css = {
        open: 'origin-top-right absolute right-0 mt-2 w-28 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none',
        close: 'hidden'
    }
    return (
        <nav className="bg-gray-800 sticky top-0 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <img className="h-8 w-8 rounded-lg" src="https://w7.pngwing.com/pngs/442/295/png-transparent-logo-atlanta-hawks-high-grade-honor-logo-monochrome-falcon-thumbnail.png" alt="Workflow" />
                        </div>
                        <div >
                            <div className="ml-10 flex items-baseline space-x-4">
                                <Link href={'/user/dashboard'}>
                                    <button className=" text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Dashboard</button>
                                </Link>
                                <Link href={'/user/movie'}>
                                    <button className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Movies</button>
                                </Link>

                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div className="ml-4 flex items-center md:ml-6">
                            <div className="ml-3 relative">
                                <div>
                                    <button onClick={() => { dropDown ? setDropDown(false) : setDropDown(true) }} className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                        <div className="h-8 w-8 rounded-full flex p-1 align-center justify-center"> <FaRegUser color='white' size={20} /></div>
                                    </button>
                                </div>
                                <div className={dropDown ? css.open : css.close}>
                                    <button className="block px-4 py-2 text-sm text-gray-700">Profile</button>
                                    <button className="block px-4 py-2 text-sm text-gray-700">Logout</button>
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