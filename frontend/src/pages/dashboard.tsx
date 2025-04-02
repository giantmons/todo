import { Card } from "@/components/ui/card";
import getFormattedDate from "@/components/ui/date";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAddTask } from "@/hooks/dashboard/useAddTask";
import { useDeleteTask } from "@/hooks/dashboard/useDeleteTask";
import { useGetTask } from "@/hooks/dashboard/useGetTask";
import { useMarkTaskComplete } from "@/hooks/dashboard/useMarkTaskComplete";
import { useUserInfo } from "@/hooks/dashboard/useUserInfo";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {  CheckCircle2Icon, Trash2Icon } from "lucide-react";

export default function Dashboard() {
    const [refreshTrigger, setRefreshTrigger] = useState(false);
    const tasks = useGetTask(refreshTrigger);
    const { handleDelete } = useDeleteTask()
    const { handleMarkTaskComplete } = useMarkTaskComplete();
    const { addNewTask } = useAddTask();
    const date = getFormattedDate();
    const user = useUserInfo();

    const [formData, setFormData] = useState({
        title: "",
        description: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleDeleteClick = async (taskId: string) => {
        await handleDelete(taskId);
        setRefreshTrigger((prev) => !prev); // ✅ This triggers re-fetching
    };

    const handleMarkTaskCompleteClick = async (taskId: string) => {
        await handleMarkTaskComplete(taskId);
        setRefreshTrigger((prev) => !prev); // ✅ This triggers re-fetching
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await addNewTask(e, formData);
        setRefreshTrigger((prev) => !prev); // ✅ This triggers re-fetching
    };

    return (
        <>
            <div className="font-poppins bg-[#f4f4f4] p-10 h-screen overflow-hidden">
                <div className="mx-[10%]">
                    <div>
                        <h1 className="text-2xl font-semibold">Welcome back, {user.username}!</h1>
                        <p className="text-gray-500">{date}</p>
                    </div>

                    <Dialog>
                        <DialogTrigger className="z-10 absolute left-1/2 -translate-x-1/2 bottom-5 h-12 rounded-3xl w-[30%] bg-black hover:scale-105 transition cursor-pointer flex justify-center items-center text-white">Create new Task</DialogTrigger>
                        <DialogContent className="bg-white">
                            <DialogHeader>
                                <DialogTitle className="mb-3">Create a Task</DialogTitle>
                                <DialogDescription>
                                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                                        <input type="text" name="title" placeholder="Title" onChange={handleChange} required className="p-2 border rounded-sm border-gray-300" />
                                        <input type="text" name="description" placeholder="Description" onChange={handleChange} required className="p-2 border rounded-sm border-gray-300" />
                                        <button type="submit">Submit</button>
                                    </form>
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>


                    <div>
                        <h1 className="mb-4">Welcome to Your Tasks</h1>



                        <ScrollArea className="h-[500px] overflow-y-auto">
                            <AnimatePresence>
                                {tasks.length > 0 ? (
                                    tasks.slice().reverse().map((task) => (
                                        <motion.div
                                            key={task._id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <Card className="flex flex-row mb-3 justify-between items-center px-6 bg-white border-none">
                                                <div className="flex gap-4">
                                                    <h3>{task.title}</h3>
                                                    <p>{task.description}</p>
                                                </div>

                                                <div className="flex gap-4 items-center">
                                                    <p>{task.completed ? "Completed" : "Incomplete"}</p>
                                                    <button onClick={() => handleDeleteClick(task._id)}><div className="border rounded-md border-gray-200 p-2 hover:bg-black transition hover:text-white cursor-pointer"><Trash2Icon /></div></button>
                                                    {task.completed ? (
                                                        <button disabled={true}><div className="border bg-amber-300 rounded-md border-gray-200 p-2 text-white"><CheckCircle2Icon /></div></button>
                                                    ) : (
                                                        <button onClick={() => handleMarkTaskCompleteClick(task._id)}><div className="border rounded-md border-gray-200 p-2 hover:bg-black transition hover:text-white cursor-pointer"><CheckCircle2Icon /></div></button>
                                                    )}
                                                </div>
                                            </Card>
                                        </motion.div>
                                    ))
                                ) : (
                                    <p>No tasks found</p>
                                )}
                            </AnimatePresence>
                        </ScrollArea>




                    </div>
                </div>
            </div>


        </>
    );
}

