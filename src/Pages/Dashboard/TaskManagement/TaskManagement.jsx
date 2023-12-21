import { Helmet } from "react-helmet-async";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../../API";
import Loader from "../../../Components/Shared/Loader";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";

const TaskManagement = () => {

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

    const handleDragStart = (e, id) => {
        e.dataTransfer.setData('text/plain', id)
    }
    const handleDragOver = e => {
        e.preventDefault()
    }
    const handleDrop = async (e) => {
        e.preventDefault()
        const taskId = e.dataTransfer.getData('text/plain')

        try {
            const res = await axiosSecure.patch(`/task/ongoing/${taskId}`)
            if (res.data.modifiedCount > 0) {
                toast.success('task added to ongoing list')
                refetch()
            }
        } catch (err) {
            toast.error(err.message)
        }
    }
    const handleCompletedDrop = async (e) => {
        e.preventDefault()
        const taskId = e.dataTransfer.getData('text/plain')

        try {
            const res = await axiosSecure.patch(`/task/completed/${taskId}`)
            if (res.data.modifiedCount > 0) {
                toast.success('task added to completed list')
                refetch()
            }
        } catch (err) {
            toast.error(err.message)
        }
    }

    return (
        <div className=" mt-5">
            <Helmet><title>Dashboard-Home | Task-Forge</title></Helmet>
            <div>
                <div className=" p-5 shadow-lg">
                    <h1 className=" text-xl md:text-3xl font-bold text-center mb-4 md:mb-8">To-Do</h1>
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
                                        tasks?.filter(item => !item.ongoing && !item.completed)?.map(task => <tr
                                            key={task._id}
                                            draggable
                                            onDragStart={(e) => handleDragStart(e, task._id)}
                                        >
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
                {/* ongoing--------------------------------------------------- */}
                <div className=" p-5 shadow-lg mt-5 md:mt-16">
                    <h1 className=" text-xl md:text-3xl font-bold text-center mb-4 md:mb-8">Ongoing Task</h1>
                    <div>
                        <div
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            className="overflow-x-auto">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>Deadline</th>
                                        <th>Priority</th>
                                        {/* <th>Ongoing</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        tasks?.filter(item => item.ongoing && !item.completed)?.map(task => <tr
                                            key={task._id}
                                            draggable
                                            onDragStart={(e) => handleDragStart(e, task._id)}
                                        >
                                            <th>{task.title}</th>
                                            <td>{task.description}</td>
                                            <td>{task.deadline}</td>
                                            <td>{task.priority}</td>
                                            {/* <td>{task.ongoing}</td> */}
                                        </tr>)
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {/* completed------------------------------------------- */}
                <div className=" p-5 shadow-lg mt-5 md:mt-16">
                    <h1 className=" text-xl md:text-3xl font-bold text-center mb-4 md:mb-8">Completed Task</h1>
                    <div>
                        <div
                            onDragOver={handleDragOver}
                            onDrop={handleCompletedDrop}
                            className="overflow-x-auto">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>Deadline</th>
                                        <th>Priority</th>
                                        {/* <th>Ongoing</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        tasks?.filter(item => !item.ongoing && item.completed)?.map(task => <tr key={task._id} draggable>
                                            <th>{task.title}</th>
                                            <td>{task.description}</td>
                                            <td>{task.deadline}</td>
                                            <td>{task.priority}</td>
                                            {/* <td>{task.ongoing}</td> */}
                                        </tr>)
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <Toaster position="top-right"></Toaster>
        </div>
    );
};

export default TaskManagement;