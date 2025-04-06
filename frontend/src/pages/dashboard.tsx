import getFormattedDate from "@/components/ui/date";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAddTask } from "@/hooks/dashboard/useAddTask";
import { useGetTask } from "@/hooks/dashboard/useGetTask";
import { useUserInfo } from "@/hooks/dashboard/useUserInfo";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import TaskItem from "../components/taskItem"; // Import the TaskItem component

export default function Dashboard() {
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const tasks = useGetTask(refreshTrigger);
  const { addNewTask } = useAddTask();
  const date = getFormattedDate();
  const user = useUserInfo();

  const [formData, setFormData] = useState({
    title: "",
    description: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addNewTask(e, formData);
    setRefreshTrigger(prev => !prev);
  };

  const handleTaskUpdate = () => {
    setRefreshTrigger(prev => !prev);
  };

  return (
    <>
      <div className="font-poppins bg-[#f4f4f4] h-screen overflow-hidden">
        <div className="mx-4 lg:mx-[10%] mt-10">
          <div>
            <h1 className="text-2xl font-semibold">Welcome back, {user.username}!</h1>
            <p className="text-gray-500">{date}</p>
          </div>

          <Dialog>
            <DialogTrigger className="z-10 absolute left-1/2 -translate-x-1/2 bottom-5 h-12 rounded-3xl w-[80%] lg:w-[30%] bg-black hover:scale-105 transition cursor-pointer flex justify-center items-center text-white">
              Create new Task
            </DialogTrigger>
            <DialogContent className="bg-white">
              <DialogHeader>
                <DialogTitle className="mb-3">Create a Task</DialogTitle>
                <DialogDescription>
                  <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input type="text" name="title" placeholder="Title" onChange={handleChange} required className="p-2 border rounded-sm border-gray-300" />
                    <textarea name="description" placeholder="Description" onChange={handleChange} required className="p-2 h-26 border rounded-sm border-gray-300" />
                    <button type="submit" className="font-poppins text-white rounded-xl bg-black p-3 hover:scale-95 transition cursor-pointer">
                      Submit
                    </button>
                  </form>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <div>
            <h1 className="mb-4">Welcome to Your Tasks</h1>
            <div className="w-full h-24 rounded-xl mb-4 bg-black">

            </div>
            <ScrollArea className="h-[500px] w-full overflow-y-auto">
              <AnimatePresence>
                {tasks.length > 0 ? (
                  tasks.slice().reverse().map((task) => (
                    <motion.div key={task._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                      <TaskItem task={task} onTaskUpdated={handleTaskUpdate} />
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
