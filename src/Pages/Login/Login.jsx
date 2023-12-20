import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Container from "../../Components/Shared/Container";
import { FcGoogle } from "react-icons/fc";


const Login = () => {
    const handleLogin = (e) => {
        e.preventDefault()
        const form = e.target
        const email = form.email.value
        const password = form.password.value
        console.log(email, password)
    }
    return (
        <div className="">
            <Helmet>
                <title>Task-Forge | Login</title>
            </Helmet>
            <Container>
                <div className="hero min-h-screen">
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
                </div>
            </Container>
        </div>
    );
};

export default Login;