import getFormattedDate from "@/components/ui/date";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAddTask } from "@/hooks/dashboard/useAddTask";
import { useGetTask } from "@/hooks/dashboard/useGetTask";
import { useUserInfo } from "@/hooks/dashboard/useUserInfo";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import TaskItem from "../components/taskItem"; // Import the TaskItem component
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster, toast } from "sonner";
import Lottie from "react-lottie";
import notebookLottie from "../assets/lottie/notebook.json"


export default function Dashboard() {
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const tasks = useGetTask(refreshTrigger);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { addNewTask } = useAddTask();
  const date = getFormattedDate();
  const user = useUserInfo();
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "",
  });

  // For standard inputs (title and description)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // For the custom Select component, update the priority directly
  const handlePriorityChange = (value: string) => {
    setFormData({ ...formData, priority: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addNewTask(e, formData);
    setRefreshTrigger((prev) => !prev);
    toast.success("Task is saved successfully!")
    setIsDialogOpen(false)
  };

  const handleTaskUpdate = () => {
    setRefreshTrigger((prev) => !prev);
  };

  // Filtering tasks based on the selected filter
  const filteredTasks = tasks.filter((task) => {
    // Check status filter
    const statusMatch =
      statusFilter === "all"
        ? true
        : statusFilter === "completed"
          ? task.completed === true
          : task.completed === false;

    // Check priority filter (converting both to lowercase for consistency)
    const priorityMatch =
      priorityFilter === "all"
        ? true
        : task.priority.toLowerCase() === priorityFilter.toLowerCase();

    // Only include tasks that match both criteria
    return statusMatch && priorityMatch;
  });

  const notebook = {
    animationData: notebookLottie,
    loop: true
  }

  return (
    <div className="font-poppins bg-[#f4f4f4] h-screen lg:overflow-y-auto">
      <Toaster richColors closeButton />


      <div className="mx-4 lg:mx-[10%] mt-10">
        <div>
          <h1 className="text-2xl font-semibold">Welcome back, {user.username}!</h1>
          <p className="text-gray-500">{date}</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger className="z-10 absolute left-1/2 -translate-x-1/2 bottom-5 h-12 rounded-3xl w-[80%] lg:w-[30%] bg-black hover:scale-105 transition cursor-pointer flex justify-center items-center text-white">
            Create new Task
          </DialogTrigger>
          <DialogContent className="bg-white">
            <DialogHeader>

              <DialogDescription>
                <div className="h-[150px]">
                  <Lottie options={notebook} />
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3 font-poppins">
                  <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    onChange={handleChange}
                    required
                    className="p-2 border rounded-sm border-gray-300"
                  />
                  <input
                    name="description"
                    placeholder="#DoItToday!"
                    onChange={handleChange}
                    className="p-2 border rounded-sm border-gray-300"
                  />
                  {/* Use the custom Select component to update priority */}
                  <Select onValueChange={handlePriorityChange} required >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select task Priority" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                    </SelectContent>
                  </Select>
                  <button
                    type="submit"
                    className="font-poppins text-white rounded-xl bg-black p-3 hover:scale-95 transition cursor-pointer"
                  >
                    Submit
                  </button>
                </form>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <div className="mt-10">
          {/* <div className="absolute">
            <Lottie options={options}></Lottie>
          </div> */}
          <div className="flex justify-end gap-2 items-center p-4 w-full h-24 rounded-5xl mb-4 shadow-md rounded-xl bg-[#2f2b43]">




            {/* Filter buttons */}
            <Select onValueChange={(value) => setStatusFilter(value)}>
              <SelectTrigger className="bg-white min-w-[150px]">
                <SelectValue placeholder="Status"></SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-white font-poppins">
                <SelectItem className="hover:bg-[#2f2b43] hover:text-white transition" value="all">All</SelectItem>
                <SelectItem className="hover:bg-[#2f2b43] hover:text-white transition" value="completed">Completed</SelectItem>
                <SelectItem className="hover:bg-[#2f2b43] hover:text-white transition" value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>

            <Select onValueChange={(value) => setPriorityFilter(value)}>
              <SelectTrigger className="bg-white min-w-[150px]">
                <SelectValue placeholder="Priority"></SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-white font-poppins">
                <SelectItem className="hover:bg-[#2f2b43] hover:text-white transition" value="all">All</SelectItem>
                <SelectItem className="hover:bg-[#2f2b43] hover:text-white transition" value="low">Low</SelectItem>
                <SelectItem className="hover:bg-[#2f2b43] hover:text-white transition" value="medium">Medium</SelectItem>
                <SelectItem className="hover:bg-[#2f2b43] hover:text-white transition" value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* <ScrollArea className="h-[500px] w-full overflow-y-auto"> */}
            <AnimatePresence>
              {filteredTasks.length > 0 ? (
                filteredTasks.slice().reverse().map((task) => (
                  <motion.div
                    key={task._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <TaskItem task={task} onTaskUpdated={handleTaskUpdate} />
                  </motion.div>
                ))
              ) : (
                <p>No tasks found</p>
              )}
            </AnimatePresence>
          {/* </ScrollArea> */}
        </div>
      </div>
    </div>
  );
}
