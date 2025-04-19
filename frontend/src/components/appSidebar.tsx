import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import useAddTaskGroup from "@/hooks/dashboard/useAddTaskGroup";
import useGetTaskGroup from "@/hooks/dashboard/useGetTaskGroup";
import { PlusIcon, Trash2 } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTrigger } from "./ui/dialog";
import { useNavigate } from "react-router-dom";
import logout from "@/assets/lottie/logout.json"
import Lottie from "react-lottie";
import useDeleteTaskGroup from "@/hooks/dashboard/useDeleteTaskGroup";


interface AppSidebarProps {
  onSelectGroup: (group: string) => void;
  onTaskUpdated: () => void; 
}


export function AppSidebar({ onSelectGroup, onTaskUpdated }: AppSidebarProps) {
  const [refreshTrigger, setRefreshTrigger] = useState(false); 
  const taskGroup = useGetTaskGroup(refreshTrigger);
  const addTaskGroup = useAddTaskGroup();
  const [selectedGroup, setSelectedGroup] = useState("all");
  const { handleDeleteTaskGroup } = useDeleteTaskGroup();
  const [formData, setFormData] = useState({
    title: "",
    description: ""
  })

  const navigate = useNavigate();

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!addTaskGroup) return
  
    await addTaskGroup.handleAddTaskGroup(formData.title, formData.description)
    setFormData({ title: "", description: "" }); // Reset form
    setRefreshTrigger(prev => !prev);
    onTaskUpdated(); // Make sure this is being called
  }

  const handleSelectGroup = (group: string) => {
    setSelectedGroup(group);
    onSelectGroup(group);
  };

  const getButtonClass = (group: string) =>
    `w-full text-center shadow-sm p-2 cursor-pointer font-poppins rounded-sm transition ${selectedGroup === group
      ? "bg-[#2f2b43] text-white"
      : "bg-white text-black hover:bg-[#1f1b33] hover:text-white"
    }`;

  const logoutLottie = {
    animationData: logout,
    loop: false,
  }

  const handleLogOut = () => {
    localStorage.clear()
    navigate("/")
  }

  const handleDeleteClick = async (id: string) => {
    await handleDeleteTaskGroup(id);
    setRefreshTrigger(prev => !prev);
    onTaskUpdated(); // Make sure this is being called
  }

  return (
    <Sidebar className="border-none shadow-md z-20">
      <SidebarContent className="mx-3">
        <SidebarGroup>
          <SidebarGroupContent>
            <div className="flex justify-center items-center my-3">
              <div className="bg-red-300 h-32 w-32 rounded-full">

              </div>
            </div>

            <SidebarMenu>
              <SidebarMenuItem>
                <div className="flex flex-col gap-2 w-full">

                  <Dialog>
                    <DialogTrigger>
                      <div className="bg-[#2f2b43] p-2 rounded-sm flex justify-center items-center cursor-pointer transition hover:bg-[#16141F]">
                        <PlusIcon className="text-white" />
                      </div>
                    </DialogTrigger>
                    <DialogContent className="bg-white">
                      <form onSubmit={handleSubmit} className="flex flex-col gap-2 text-sm">
                        <input type="text" name="title" onChange={handleFormChange} placeholder="Group Name" className="p-2 border rounded-sm border-gray-300 w-full" />
                        <textarea name="description" onChange={handleFormChange} className="p-2 border rounded-sm border-gray-300 w-full h-20" />
                        <button
                          type="submit"
                          className="font-poppins text-white rounded-xl bg-black p-3 hover:scale-95 transition cursor-pointer"
                        >
                          Submit
                        </button>
                      </form>
                    </DialogContent>
                  </Dialog>

                  {/* All button */}
                  <button
                    onClick={() => handleSelectGroup("all")}
                    className={getButtonClass("all")}
                  >
                    All Tasks
                  </button>

                  {/* Dynamic task groups */}
                  {taskGroup?.map((task) => (
                    <button
                      key={task.title}
                      onClick={() => handleSelectGroup(task.title)}
                      className={getButtonClass(task.title)}
                    >
                      {selectedGroup === task.title ? <button className="absolute left-3 cursor-pointer hover:text-blue-300" onClick={() => handleDeleteClick(task._id)}><Trash2 size={18}/></button> : ""}
                      {task.title}
                    </button>
                  ))}
                </div>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarContent className="mx-3">
          <Dialog>
            <DialogTrigger>
              <button className="w-full font-poppins bg-red-900 p-2 rounded-sm text-white hover:bg-red-700 cursor-pointer transition text-sm">Log out</button>
            </DialogTrigger>
            <DialogContent className="bg-white">
              <DialogHeader>
                <div className="flex justify-center items-center">
                  <div className="w-40">
                    <Lottie options={logoutLottie} />
                  </div>
                </div>
                <p className="text-center font-poppins">Are you sure?</p>
              </DialogHeader>
              <div className="w-full flex justify-center items-center font-poppins gap-1 text-sm">
                <DialogClose className="flex-1">
                  <button className="border p-2 w-full rounded-sm cursor-pointer hover:bg-[#2f2b43] hover:text-white transition">Close</button>
                </DialogClose>
                <button onClick={handleLogOut} className="border p-2 flex-1 rounded-sm bg-[#2f2b43] text-white border hover:bg-[#16141F] cursor-pointer transition">Log out</button>
              </div>
            </DialogContent>
          </Dialog>
        </SidebarContent>
      </SidebarFooter>
    </Sidebar>
  );
}
