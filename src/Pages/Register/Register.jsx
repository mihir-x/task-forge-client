import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { uploadImage } from "../../API/utils";
import Swal from "sweetalert2";


const Register = () => {

    const {createUser, updateUserProfile, googleSignIn} = useAuth()
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()
    const location = useLocation()
    const from = location?.state?.from?.pathname || '/dashboard'

    const handleRegistration = async (e) => {
        e.preventDefault()
        const form = e.target
        const name = form.name.value
        const email = form.email.value
        const password = form.password.value
        const profession = form.profession.value
        const image = form.image.files[0]

        console.log(name, email, password, image)
        try {
            const imageData = await uploadImage(image)
            const result = await createUser(email, password)
            await updateUserProfile(name, imageData?.data?.display_url)
            //save user info to database
            const userInfo = {
                name: name,
                email: email,
                photo: imageData?.data?.display_url,
                profession: profession,
            }
            axiosPublic.post('/users', userInfo)
                .then(res => {
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: `Welcome ${result.user.displayName}`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                        navigate(from, {replace: true})
                    }
                })
        }
        catch (err) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: err.message
            })
        }

    }

    const handleGoogleLogin = () => {
        googleSignIn()
            .then(result => {
                console.log(result)
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `Welcome back ${result.user.displayName}`,
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(from, {replace: true})
            })
            .catch(err => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: err.message
                })
            })
    }
    

    return (
        <div className='flex justify-center items-center min-h-screen'>
            <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
                <div className='mb-8 text-center'>
                    <h1 className='my-3 text-4xl font-bold'>Sign Up</h1>
                </div>
                <form onSubmit={handleRegistration}
                    className='space-y-6 ng-untouched ng-pristine ng-valid'
                >
                    <div className='space-y-4'>
                        <div>
                            <label htmlFor='email' className='block mb-2 text-sm'>
                                Name
                            </label>
                            <input
                                type='text'
                                name='name'
                                id='name'
                                placeholder='Enter Your Name Here'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-blue-600 bg-gray-200 text-gray-900'

                            />
                        </div>
                        <div>
                            <label htmlFor='image' className='block mb-2 text-sm'>
                                Select Image:
                            </label>
                            <input
                                required
                                type='file'
                                id='image'
                                name='image'
                                accept='image/*'
                            />
                        </div>
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
                            <label htmlFor='profession' className='block mb-2 text-sm'>
                                Your Profession
                            </label>
                            <input
                                type='profession'
                                name='profession'
                                id='profession'
                                required
                                placeholder='Your Profession'
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
                                autoComplete='new-password'
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
                            className='btn btn-primary w-full rounded-md py-3 text-white'
                        >
                            Register
                        </button>
                    </div>
                </form>
                <div className='flex items-center pt-4 space-x-1'>
                    <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
                    <p className='px-3 text-sm dark:text-gray-400'>
                        Sign up with social accounts
                    </p>
                    <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
                </div>
                <div onClick={handleGoogleLogin} className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'>
                    <FcGoogle size={32} />

                    <p>Continue with Google</p>
                </div>
                <p className='px-6 text-sm text-center text-gray-400'>
                    Already have an account?{' '}
                    <Link
                        to='/login'
                        className='hover:underline hover:text-rose-500 text-gray-600'
                    >
                        Login
                    </Link>

                </p>
            </div>
        </div>
    );
};

export default Register;