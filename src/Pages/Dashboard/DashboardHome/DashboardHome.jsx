
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../../API";
import useAuth from "../../../Hooks/useAuth";
import Loader from "../../../Components/Shared/Loader";



const DashboardHome = () => {

    const { user } = useAuth()

    const { data: myTasks, isLoading } = useQuery({
        queryKey: ['myTask', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/task/${user?.email}`)
            return res.data
        }
    })
    if (isLoading) return <Loader></Loader>
    console.log(myTasks)

    return (
        <div className="">
            <div className="max-w-2xl mx-auto bg-base-200 rounded-2xl shadow-2xl py-5 md:py-32">
                <div className="flex flex-col items-center pb-10 space-y-3 md:space-y-5">
                    <img
                        alt="Bonnie image"
                        src={user?.photoURL}
                        className="mb-3 h-36 w-36 rounded-full shadow-lg object-cover"
                    />
                    <h5 className="mb-1 text-xl font-medium text-gray-900">{user?.displayName}</h5>
                    <span className="text-sm md:text-base text-gray-500"><span className="text-gray-800 font-bold">Email:</span> {user?.email}</span>
                    <div className=" flex flex-col md:flex-row gap-5">
                        <span className="text-sm md:text-base text-gray-500 dark:text-gray-400"><span className="text-gray-800 font-bold">Number of Added Task:</span> {myTasks.length}</span>
                        <span className="text-sm md:text-base text-gray-500 dark:text-gray-400"><span className="text-gray-800 font-bold">Ongoing Task:</span> {myTasks.filter(item => item.ongoing).length}</span>
                        <span className="text-sm md:text-base text-gray-500 dark:text-gray-400"><span className="text-gray-800 font-bold">Completed Task:</span> {myTasks.filter(item => item.completed).length}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;