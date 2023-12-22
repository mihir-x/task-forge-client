import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../LayOuts/MainLayout";
import Home from "../Pages/Home/Home";
import DashboardLayout from "../LayOuts/DashboardLayout";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import PrivateRoutes from "./PrivateRoutes";
import AddTask from "../Pages/Dashboard/AddTask/AddTask";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";
import EditTask from "../Pages/Dashboard/EditTask/EditTask";
import TaskManagement from "../Pages/Dashboard/TaskManagement/TaskManagement";
import AboutUs from "../Pages/AboutUs/AboutUs";

export const router = createBrowserRouter([
    {
        path: '/',
        element:<MainLayout></MainLayout>,
        errorElement: <ErrorPage></ErrorPage>,
        children:[
            {
                index: true,
                element:<Home></Home>
            },
            {
                path: '/about-us',
                element: <AboutUs></AboutUs>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            }
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoutes><DashboardLayout></DashboardLayout></PrivateRoutes>,
        children: [
            {
                index: true,
                element: <PrivateRoutes><DashboardHome></DashboardHome></PrivateRoutes>
            },
            {
                path: 'task-management',
                element: <PrivateRoutes><TaskManagement></TaskManagement></PrivateRoutes>
            },
            {
                path: 'add-task',
                element: <PrivateRoutes><AddTask></AddTask></PrivateRoutes>
            },
            {
                path: 'edit/:id',
                element: <PrivateRoutes><EditTask></EditTask></PrivateRoutes>
            }
        ]
    }
])