import getFormattedDate from "@/utils/date";
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
import { useEffect, useState } from "react";
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
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/appSidebar";
import emptyList from "@/assets/lottie/empty-list.json"
import useGetTaskGroup from "@/hooks/dashboard/useGetTaskGroup";
import { groupTasksByDate } from "@/utils/groupTaskByDate";
import Magnet from "@/components/ui/magnet";
import { Plus } from "lucide-react";


export default function Dashboard() {
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const tasks = useGetTask(refreshTrigger);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { addNewTask } = useAddTask();
  const date = getFormattedDate();
  const user = useUserInfo();
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const taskGroup = useGetTaskGroup(refreshTrigger);


  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "",
    groupId: "",
  });

  useEffect(() => {
    if (!isDialogOpen) {
      setFormData({
        title: "",
        description: "",
        priority: "",
        groupId: "",
      });
    }
  }, [isDialogOpen]);


  // For standard inputs (title and description)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // For the custom Select component, update the priority directly
  const handlePriorityChange = (value: string) => {
    setFormData({ ...formData, priority: value });
  };

  const handleTaskGroupChange = (value: string) => {
    setFormData({ ...formData, groupId: value });
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Create a cleaned version of formData
    const payload: any = {
      title: formData.title,
      description: formData.description,
      priority: formData.priority,
    };

    // Only include groupId if it's not an empty string
    if (formData.groupId && formData.groupId.trim() !== "") {
      payload.groupId = formData.groupId;
    }

    await addNewTask(e, payload);
    setRefreshTrigger((prev) => !prev);
    toast.success("Task is saved successfully!");
    setIsDialogOpen(false);
  };


// In Dashboard.tsx
const handleTaskUpdate = () => {
  console.log("Task update triggered"); // Add this for debugging
  setRefreshTrigger(prev => !prev);
};

  // Filtering tasks based on the selected filter
  const filteredTasks = tasks.filter((task) => {
    const statusMatch =
      statusFilter === "all"
        ? true
        : statusFilter === "completed"
          ? task.completed === true
          : task.completed === false;

    const priorityMatch =
      priorityFilter === "all"
        ? true
        : task.priority.toLowerCase() === priorityFilter.toLowerCase();

    const groupMatch =
      selectedGroup === null || selectedGroup === "all"
        ? true
        : task.groupId?.title === selectedGroup;


    return statusMatch && priorityMatch && groupMatch;
  });

  const groupedTasks = groupTasksByDate(filteredTasks);

  const empty = {
    animationData: emptyList,
    loop: false,
  }

  const notebook = {
    animationData: notebookLottie,
    loop: true
  }

  return (
    <SidebarProvider>
      <AppSidebar onTaskUpdated={handleTaskUpdate} onSelectGroup={(groupId) => setSelectedGroup(groupId)} />
      <SidebarInset>


        <div className="font-poppins bg-gray-100 min-h-screen lg:overflow-y-auto overflow-x-hidden">
          <Toaster richColors closeButton />


          <div className="mx-4 lg:mx-[10%]">
            <div className="flex  flex-col sm:flex-row justify-between items-center">
              <div>
                <h1 className="text-4xl font-bold mt-10">Welcome, <span className="text-[#9782f5] font-chonburi">{user.username}!</span></h1>
                <p className="text-gray-500 mb-3 sm:mt-0">{date}</p>
              </div>

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger>
                  <div>
                    <Magnet padding={100} disabled={false} magnetStrength={5}>
                      <motion.button
                        className="flex items-center text-white justify-center gap-4 border px-5 py-3 bg-[#2f2b43] cursor-pointer rounded-lg hover:bg-[#095146]"
                        animate={{ scale: [1, 1.04, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <Plus />
                        <span>Create new Task</span>
                      </motion.button>
                    </Magnet>
                  </div>
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
                          <SelectContent className="bg-white font-poppins">
                            <SelectItem className="hover:bg-[#2f2b43] cursor-pointer hover:text-white transition" value="Low">Low</SelectItem>
                            <SelectItem className="hover:bg-[#2f2b43] cursor-pointer hover:text-white transition" value="Medium">Medium</SelectItem>
                            <SelectItem className="hover:bg-[#2f2b43] cursor-pointer hover:text-white transition" value="High">High</SelectItem>
                          </SelectContent>
                        </Select>


                        <Select onValueChange={handleTaskGroupChange} value={formData.groupId}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Task Group" />
                          </SelectTrigger>
                          <SelectContent className="bg-white font-poppins">
                            {taskGroup?.map((task) => (
                              <SelectItem className="hover:bg-[#2f2b43] cursor-pointer hover:text-white transition" value={task._id}>{task.title}</SelectItem>
                            ))}
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
            </div>



            <div className="mt-10">
              <div className="flex justify-between gap-2 items-center p-4 w-full h-24 rounded-5xl mb-4 shadow-md rounded-xl bg-[#2f2b43]">
                <SidebarTrigger className="cursor-pointer" />
                <div className="flex gap-2">
                  {/* Filter buttons */}
                  <Select onValueChange={(value) => setStatusFilter(value)}>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Status"></SelectValue>
                    </SelectTrigger>
                    <SelectContent className="bg-white font-poppins">
                      <SelectItem className="hover:bg-[#2f2b43] cursor-pointer hover:text-white transition" value="all">All</SelectItem>
                      <SelectItem className="hover:bg-[#2f2b43] cursor-pointer hover:text-white transition" value="completed">Completed</SelectItem>
                      <SelectItem className="hover:bg-[#2f2b43] cursor-pointer hover:text-white transition" value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select onValueChange={(value) => setPriorityFilter(value)}>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Priority"></SelectValue>
                    </SelectTrigger>
                    <SelectContent className="bg-white font-poppins">
                      <SelectItem className="hover:bg-[#2f2b43] cursor-pointer hover:text-white transition" value="all">All</SelectItem>
                      <SelectItem className="hover:bg-[#2f2b43] cursor-pointer hover:text-white transition" value="low">Low</SelectItem>
                      <SelectItem className="hover:bg-[#2f2b43] cursor-pointer hover:text-white transition" value="medium">Medium</SelectItem>
                      <SelectItem className="hover:bg-[#2f2b43] cursor-pointer hover:text-white transition" value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

              </div>

              {/* <ScrollArea className="h-[500px] w-full overflow-y-auto"> */}
              <div className="mt-10">
                <AnimatePresence>
                  {
                    // step 3: loop over each date
                    Object.entries(groupedTasks).slice().reverse().map(([date, tasksOnDate]) => {
                      if (tasksOnDate.length === 0) return null; // Skip empty groups

                      return (
                        <div key={date} className="mb-8 bg-white rounded-lg p-5 shadow-sm">
                          <h2 className="text-lg font-semibold font-poppins mb-2">{date}</h2>
                          {tasksOnDate.slice().reverse().map(task => (
                            <motion.div
                              key={task._id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.3 }}
                            >
                              <TaskItem task={task} onTaskUpdated={handleTaskUpdate} />
                            </motion.div>
                          ))}
                        </div>
                      );
                    })

                  }
                  {filteredTasks.length === 0 && (
                    <div className="w-full h-auto flex justify-center items-center">
                      <div className="w-[200px]">
                        <Lottie options={empty} />
                        <p className="text-center">List is Empty...</p>
                      </div>
                    </div>
                  )}
                </AnimatePresence>
              </div>
              {/* </ScrollArea> */}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>

  );
}
