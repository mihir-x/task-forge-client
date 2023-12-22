import Container from "../Shared/Container";

import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../API";
import Loader from "../../Components/Shared/Loader";
import { Carousel } from "flowbite-react";
import SectionTitle from "../Shared/SectionTitle";

const UserStats = () => {

    const { data: users, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data
        }
    })
    if (isLoading) return <Loader></Loader>
    console.log(users)

    return (
        <div className=" my-5 md:my-20">
            <SectionTitle heading='See Who Using Our Service'></SectionTitle>
            <Container>
                <div className=" mb-5">
                    <p className=" text-center text-gray-700">At Task Forge, we understand the importance of staying organized and on top of your to-do list. Whether you&apos;re a developer, corporate professional, banker, or anyone in need of a powerful task management solution, Task Forge is here to elevate your productivity.</p>
                </div>
                <div className="">
                    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
                        <Carousel>
                            {
                                users?.slice(0, 5)?.map(item => <div key={item?._id} className="flex h-full items-center justify-center bg-gray-700 dark:bg-gray-700 dark:text-white">
                                    <div className="flex w-full md:w-[80%] items-center gap-5 md:gap-10">
                                        <img src={item?.photo} className="flex-1 h-full w-24 rounded-xl" alt="" />
                                        <div className="flex-1">
                                            <h1 className="text-md md:text-3xl font-bold text-white">{item?.name}</h1>
                                            <h1 className="text-lg md:text-xl font-semibold text-white">Profession: {item?.profession}</h1>

                                        </div>
                                    </div>
                                </div>)
                            }
                        </Carousel>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default UserStats;