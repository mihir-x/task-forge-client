import { Helmet } from "react-helmet-async";
import Banner from "../../Components/Banner/Banner";
import UserStats from "../../Components/UserStats/UserStats";


const Home = () => {
    
    return (
        <div>
            <Helmet><title>Home | Task-Forge</title></Helmet>
            <Banner></Banner>
            <UserStats></UserStats>
        </div>
    );
};

export default Home;