import { Helmet } from "react-helmet-async";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../../API";
import Loader from "../../../Components/Shared/Loader";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";


const DashboardHome = () => {

    const { user } = useAuth()

    const { data: tasks, isLoading, refetch } = useQuery({
        queryKey: ['myTask', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/task/${user?.email}`)
            return res.data
        }
    })
    if (isLoading) return <Loader></Loader>

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete(`/task/delete/${id}`)
                    if (res.data.deletedCount > 0) {
                        refetch()
                        Swal.fire({
                            title: "Deleted!",
                            text: "Task has been deleted.",
                            icon: "success"
                        });
                    }
                }
                catch (err) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: err.message
                    })
                }

            }
        });
    }

    return (
        <div className=" mt-5">
            <Helmet><title>Dashboard-Home | Task-Forge</title></Helmet>
            <div>
                <div className=" p-5 shadow-2xl">
                    <h1 className=" text-xl md:text-3xl font-bold text-center">To-Do</h1>
                    <div>
                        <div className="overflow-x-auto">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>Deadline</th>
                                        <th>Priority</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        tasks?.map(task => <tr key={task._id} draggable>
                                            <th>{task.title}</th>
                                            <td>{task.description}</td>
                                            <td>{task.deadline}</td>
                                            <td>{task.priority}</td>
                                            <td><Link to={`/dashboard/edit/${task._id}`}><button className="btn btn-primary">Edit</button></Link></td>
                                            <td><button onClick={() => handleDelete(task._id)} className="btn btn-error">Delete</button></td>
                                        </tr>)
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;