import { Link } from "react-router-dom";
import Container from "../Shared/Container";


const Banner = () => {
    return (
        <div>
            <Container>
                <div className="hero min-h-[500px]" style={{ backgroundImage: 'url(https://i.ibb.co/ZMHNR96/Microsoft-Teams-image-1-1200x675.png)' }}>
                    <div className="hero-overlay bg-opacity-80"></div>
                    <div className="hero-content text-center text-neutral-content">
                        <div className="max-w-md text-white">
                            <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
                            <p className="mb-5">Task Forge is your ultimate solution for seamless task management. Elevate your productivity with our user-friendly website that empowers you to organize, prioritize, and conquer your tasks with ease. </p>
                            <Link to='/dashboard'><button className="btn btn-accent">Let&apos;s Explore</button></Link>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Banner;