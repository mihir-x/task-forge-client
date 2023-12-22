import { Link } from "react-router-dom";
import Container from "../../Components/Shared/Container";


const AboutUs = () => {
    return (
        <div className=" my-5">
            <Container>
                <div className="card bg-base-100 shadow-xl">
                    <figure className="px-10 pt-10">
                        <img src="https://i.ibb.co/wSD0tsH/task-management-system-screenshot-1.png" alt="Shoes" className="rounded-xl" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">About Task Forge</h2>
                        <p>Welcome to Task Forge, your go-to destination for streamlined and efficient task management. At Task Forge, we understand the importance of staying organized and on top of your to-do list. Whether you&apos;re a developer, corporate professional, banker, or anyone in need of a powerful task management solution, Task Forge is here to elevate your productivity. It&apos;s a versatile tool designed to meet the unique needs of individuals and teams across various industries.</p>
                        <div className="card-actions">
                            <Link to='/dashboard'><button className="btn btn-primary">Go to Dashboard</button></Link>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default AboutUs;