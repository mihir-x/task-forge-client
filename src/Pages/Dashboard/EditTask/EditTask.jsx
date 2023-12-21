import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axiosSecure from "../../../API";
import Loader from "../../../Components/Shared/Loader";
import toast, { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../Components/Shared/SectionTitle";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";


const EditTask = () => {
    const { user } = useAuth()
    const { id } = useParams()
    
    const navigate = useNavigate()

    const { register, handleSubmit } = useForm()

    const { data: task, isLoading } = useQuery({
        queryKey: ['editTask', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/task/edit/${id}`)
            return res.data
        }
    })
    if (isLoading) return <Loader></Loader>

    const onSubmit = async (data) => {
        const taskDate = new Date(data.deadline)
        const taskDueTime = taskDate.getTime()
        const taskData = {
            title: data.title, description: data.description, deadline: data.deadline, priority: data.priority, taskDueTime, createdAt: Date.now(), creator: user.email, ongoing: false, completed: false,
        }
        try {
            const task = await axiosSecure.put(`/task/update/${id}`, taskData)
            console.log(task)
            if (task.data.modifiedCount>0) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Task Updated Successfully",
                    showConfirmButton: false,
                    timer: 1500
                  });
                  navigate('/dashboard/home')
            }
        } catch (err) {
            toast.error(err.message)
        }
    }

    return (
        <div>
            <Helmet><title>Edit-Task | Task-Forge</title></Helmet>
            <SectionTitle heading='Edit Task'></SectionTitle>
            <div className="text-sm md:text-base p-5 max-w-screen-sm mx-auto shadow-2xl rounded-lg">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full my-2">
                        <label className="label">
                            <span className="label-text">Task Title</span>
                        </label>
                        <input {...register('title', { required: true })} type="text" defaultValue={task.title} className="input input-bordered w-full " />
                    </div>
                    <div className="form-control w-full my-2">
                        <label className="label">
                            <span className="label-text">Task Description</span>
                        </label>
                        <input {...register('description', { required: true })} type="text" defaultValue={task.description} className="input input-bordered w-full " />
                    </div>
                    <div className="form-control w-full my-2">
                        <label className="label">
                            <span className="label-text">Deadline</span>
                        </label>
                        <input {...register('deadline', { required: true })} type="date" defaultValue={task.deadline} className="input input-bordered w-full " />
                    </div>
                    <div className="form-control w-full my-2">
                        <label className="label">
                            <span className="label-text">Priority</span>
                        </label>
                        <select {...register('priority', { required: true })} defaultValue={task.priority} type="date" className="input input-bordered " >
                            <option selected>Low</option>
                            <option>Moderate</option>
                            <option>High</option>
                        </select>
                    </div>
                    <div className="flex justify-center items-center">
                        <button className="btn btn-primary" type="submit">Edit Task</button>
                    </div>
                </form>
            </div>
            <Toaster position="top-right"></Toaster>
        </div>
    );
};

export default EditTask;