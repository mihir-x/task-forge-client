import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Container from "../../Components/Shared/Container";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";


const Login = () => {

    const { logIn } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const from = location?.state?.from?.pathname || '/'

    const handleLogin = async(e) => {
        e.preventDefault()
        const form = e.target
        const email = form.email.value
        const password = form.password.value
        console.log(email, password)

        try {
            const result = await logIn(email, password)
            navigate(from, {replace: true})
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `Welcome back ${result.user.displayName}`,
                showConfirmButton: false,
                timer: 1500
            });
        }
        catch (err) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: err.message
            })
        }
    }
    return (
        <div className="">
            <Helmet>
                <title>Task-Forge | Login</title>
            </Helmet>
            <Container>
                {/* <div className="hero min-h-screen">
                    <div className="hero-content ">
                        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 md:p-5">
                            <h1 className="text-2xl md:text-5xl font-bold text-center mt-2 md:mt-0">Login now!</h1>
                            <form onSubmit={handleLogin} className="card-body">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                                </div>
                                <div className="form-control mt-6">
                                    <button type="submit" className="btn btn-primary">Login</button>
                                </div>
                            </form>
                            <div className=" cursor-pointer p-2 border-2 rounded-lg mt-5 text-center flex justify-center items-center gap-2">
                                <FcGoogle size={24}></FcGoogle>
                                <p className=" font-semibold">Continue With Google</p>
                            </div>
                            <div className=" cursor-pointer p-2 border-2 rounded-lg mt-5 text-center flex justify-center items-center gap-2">
                                <FcGoogle size={24}></FcGoogle>
                                <p className=" font-semibold">Continue With Google</p>
                            </div>
                            <p className=" text-center text-gray-400 mt-4">Don&apos;t have an account? <Link to='/register' className=" text-gray-600 hover:underline hover:text-red-500">Register</Link></p>
                        </div>
                    </div>
                </div> */}
                <div className='flex justify-center items-center min-h-screen'>
                    <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
                        <div className='mb-8 text-center'>
                            <h1 className='my-3 text-4xl font-bold'>Log In</h1>
                        </div>
                        <form onSubmit={handleLogin}
                            className='space-y-6 ng-untouched ng-pristine ng-valid'
                        >
                            <div className='space-y-4'>
                                <div>
                                    <label htmlFor='email' className='block mb-2 text-sm'>
                                        Email address
                                    </label>
                                    <input
                                        type='email'
                                        name='email'
                                        id='email'
                                        required
                                        placeholder='Your Email'
                                        className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-blue-600 bg-gray-200 text-gray-900'

                                    />
                                </div>
                                <div>
                                    <div className='flex justify-between'>
                                        <label htmlFor='password' className='text-sm mb-2'>
                                            Password
                                        </label>
                                    </div>
                                    <input
                                        type='password'
                                        name='password'
                                        autoComplete='current-password'
                                        id='password'
                                        required
                                        placeholder='*******'
                                        className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-blue-600 bg-gray-200 text-gray-900'
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type='submit'
                                    className='btn-primary btn w-full rounded-md py-3 text-white'
                                >
                                    Login
                                </button>
                            </div>
                        </form>
                        <div className='flex items-center pt-4 space-x-1'>
                            <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
                            <p className='px-3 text-sm dark:text-gray-400'>
                                Login with social accounts
                            </p>
                            <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
                        </div>
                        <div className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'>
                            <FcGoogle size={32} />

                            <p>Continue with Google</p>
                        </div>
                        <p className='px-6 text-sm text-center text-gray-400'>
                            Don&apos;t have an account yet?{' '}
                            <Link
                                to='/register'
                                className='hover:underline hover:text-green-500 text-gray-600'
                            >
                                Sign up
                            </Link>
                            .
                        </p>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Login;