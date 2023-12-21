import { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { GrLogout } from 'react-icons/gr'
import Loader from "../../Shared/Loader";
import { NavLink } from "react-router-dom";


const Sidebar = () => {
    const { user, logOut, loading } = useAuth()
    const [isActive, setActive] = useState(false)

    if (loading) return <Loader></Loader>

    const handleToggle = () => {
        setActive(!isActive)
    }

    const handleLogOut = () => {
        logOut()
            .then(() => {
                Swal.fire("User logged out!")
            })
            .catch(() => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!"
                })
            })
    }

    return (
        <div>
            {/* Small Screen Navbar */}
            <div className='bg-gray-100 text-gray-800 flex justify-between md:hidden'>
                <div>
                    <div className='block cursor-pointer p-4 font-bold'>
                    <img src={user.photoURL} alt="" className="w-16 h-16 rounded-full" />
                    </div>
                </div>

                <button
                    onClick={handleToggle}
                    className='mobile-menu-button p-4 focus:outline-none focus:bg-gray-200'
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </button>
            </div>
            {/* Sidebar */}
            <div
                className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${isActive && '-translate-x-full'
                    }  md:translate-x-0  transition duration-200 ease-in-out`}
            >
                <div>
                    <div>
                        <div className='w-full hidden md:flex flex-col px-4 py-2 rounded-lg justify-center items-center mx-auto'>
                            <img src={user.photoURL} alt="" className="w-16 h-16 rounded-full" />
                            <h3 className="text-sm md:text-xl font-bold">{user.displayName}</h3>
                        </div>
                    </div>
                    <hr />
                    {/* Nav Items */}
                    <div className='flex flex-col justify-between flex-1 mt-6'>

                        
                        <NavLink to='/dashboard/home'
                            className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "bg-gray-500 text-white font-bold mb-2 p-2 rounded-md shadow-md border" : "mb-2 border p-2 rounded-md border-black"
                            }
                        >
                            Dashboard Home 
                        </NavLink>
                        <NavLink to='/dashboard/add-task'
                            className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "bg-gray-500 text-white font-bold mb-2 p-2 rounded-md shadow-md border" : "mb-2 border p-2 rounded-md border-black"
                            }
                        >
                            Add Task 
                        </NavLink>
                       
                    </div>
                </div>

                <div>
                    <hr />
                    <button onClick={handleLogOut} className='flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform'>
                        <GrLogout className='w-5 h-5' />
                        <span className='mx-4 font-medium'>Logout</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;