import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../LayOuts/MainLayout";
import Home from "../Pages/Home/Home";
import DashboardLayout from "../LayOuts/DashboardLayout";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Login from "../Pages/Login/Login";

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
                path: '/login',
                element: <Login></Login>
            }
        ]
    },
    {
        path: 'dashboard',
        element: <DashboardLayout></DashboardLayout>,
    }
])