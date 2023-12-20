import { Outlet } from "react-router-dom";


const MainLayout = () => {
    return (
        <div>
            this is main MainLayout
            <Outlet></Outlet>
        </div>
    );
};

export default MainLayout;