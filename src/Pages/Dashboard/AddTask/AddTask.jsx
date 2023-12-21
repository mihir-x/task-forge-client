import { Helmet } from "react-helmet-async";
import useAuth from "../../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import SectionTitle from "../../../Components/Shared/SectionTitle";
import Loader from "../../../Components/Shared/Loader";
import axiosSecure from "../../../API";
import toast, { Toaster } from "react-hot-toast";


const AddTask = () => {
    const { user, loading } = useAuth()
    const { register, handleSubmit, reset } = useForm()

    if (loading) return <Loader></Loader>

    const onSubmit = async (data) => {
        const taskDate = new Date(data.deadline)
        const taskDueTime = taskDate.getTime()
        const taskData = {
            title: data.title, description: data.description, deadline: data.deadline, priority: data.priority, taskDueTime, createdAt: Date.now(), creator: user.email, ongoing: false, completed: false,
        }
        try {
            const task = await axiosSecure.post('/task', taskData)
            if (task.data.insertedId) {
                toast.success('Task successfully added to to-do list')
                reset()
            }
        } catch (err) {
            toast.error(err.message)
        }
    }

    return (
        <div>
            <Helmet><title>Add-Task | Task-Forge</title></Helmet>
            <SectionTitle heading='Add Task'></SectionTitle>
            <div className="text-sm md:text-base p-5 max-w-screen-sm mx-auto shadow-2xl rounded-lg">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full my-2">
                        <label className="label">
                            <span className="label-text">Task Title</span>
                        </label>
                        <input {...register('title', { required: true })} type="text" placeholder="Title" className="input input-bordered w-full " />
                    </div>
                    <div className="form-control w-full my-2">
                        <label className="label">
                            <span className="label-text">Task Description</span>
                        </label>
                        <input {...register('description', { required: true })} type="text" placeholder="Task description" className="input input-bordered w-full " />
                    </div>
                    <div className="form-control w-full my-2">
                        <label className="label">
                            <span className="label-text">Deadline</span>
                        </label>
                        <input {...register('deadline', { required: true })} type="date" className="input input-bordered w-full " />
                    </div>
                    <div className="form-control w-full my-2">
                        <label className="label">
                            <span className="label-text">Priority</span>
                        </label>
                        <select {...register('priority', { required: true })} type="date" className="input input-bordered " >
                            <option selected>Low</option>
                            <option>Moderate</option>
                            <option>High</option>
                        </select>
                    </div>
                    <div className="flex justify-center items-center">
                        <button className="btn btn-primary" type="submit">Add Task</button>
                    </div>
                </form>
            </div>
            <Toaster position="top-right"></Toaster>
        </div>
    );
};

export default AddTask;