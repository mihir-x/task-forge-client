import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";


const Navbar = () => {
    const { user, logOut } = useAuth()
    const navigate = useNavigate()

    const navLinks = <>
        <li><NavLink to='/' className={({ isActive }) => isActive ? ' font-bold underline text-green-500 ' : ''}>Home</NavLink></li>
        <li><NavLink to='/dashboard' className={({ isActive }) => isActive ? ' font-bold underline text-green-500 ' : ''}>Dashboard</NavLink></li>
        <li><NavLink to='/about-us' className={({ isActive }) => isActive ? ' font-bold underline text-green-500 ' : ''}>About Us</NavLink></li>
    </>
    const handleLogOut = () => {
        logOut()
            .then(() => {
                Swal.fire("User logged out!")
                navigate('/')
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
        <div className="navbar bg-base-100 shadow-lg">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navLinks}
                    </ul>
                </div>
                <img src="/logo.png" className=" w-10 md:w-16" alt="" />
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navLinks}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ? <div className="flex flex-col md:flex-row items-center gap-1">
                        <div className="flex items-center gap-1 p-1 border rounded-l-full rounded-r-full">
                            <img src={user.photoURL} alt="" className="w-10 h-10 rounded-full" />
                            <h3 className="text-sm md:text-xl font-bold">{user.displayName}</h3>
                        </div>
                        <div>
                            <button onClick={handleLogOut} className="px-2 py-1 rounded-md text-sm font-bold bg-blue-500 text-white">Log Out</button>
                        </div>
                    </div>
                        : <Link to='/login'><button className="btn">Login</button></Link>
                }
            </div>
        </div>
    );
};

export default Navbar;