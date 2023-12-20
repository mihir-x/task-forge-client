
import { Link } from "react-router-dom";


const ErrorPage = () => {
    return (
        <div className=" h-screen flex flex-col md:flex-row justify-center items-center ">
            <img src="https://i.ibb.co/9ZQCchF/bbb.png" alt="" />
            <div className=" flex flex-col items-center space-y-2 md:space-y-6">
                <h1 className=" text-2xl md:text-5xl lg:text-9xl font-bold">404</h1>
                <h1 className=" text-xl md:text-3xl lg:text-5xl font-bold">Ooops!</h1>
                <Link to={-1}><button className=" btn btn-accent">Go Back</button></Link>
            </div>
        </div>
    );
};

export default ErrorPage;