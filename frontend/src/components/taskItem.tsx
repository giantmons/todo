import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Trash2Icon, CheckCircle2Icon, EllipsisVerticalIcon } from "lucide-react";
import { useMarkTaskComplete } from "@/hooks/dashboard/useMarkTaskComplete";
import { useDeleteTask } from "@/hooks/dashboard/useDeleteTask";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "./ui/dialog";
import { useUpdatePriority } from "@/hooks/dashboard/useUpdatePriority";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { PriorityBadge } from "./ui/priority-badge";
import { toast } from "sonner";
import { Badge } from "./ui/badge";
import Lottie from "react-lottie";
import trashLottie from "../assets/lottie/trash-lottie.json"


// Define Task interface with uppercase "T"
interface Task {
    _id: string;
    title: string;
    description: string;
    completed: boolean;
    priority: string;
}

interface TaskItemProps {
    task: Task;
    onTaskUpdated: () => void; // Callback to trigger a refresh when a task is updated
}

export default function TaskItem({ task, onTaskUpdated }: TaskItemProps) {
    const { handleDelete } = useDeleteTask();
    const { handlePriorityChange } = useUpdatePriority();
    const { handleToggle } = useMarkTaskComplete(task._id, task.completed);
    const [selectedPriority, setSelectedPriority] = useState(task.priority);
    const [isCompleted, setIsCompleted] = useState(task.completed);

    useEffect(() => {
        setIsCompleted(task.completed); // Sync with external updates
    }, [task.completed]);

    const handleToggleClick = async () => {
        await handleToggle();
        setIsCompleted((prev) => !prev); // Update local state for immediate UI change
        onTaskUpdated(); // Trigger parent update
    };

    // Accept the new priority value directly (ShadCN's Select sends a string)
    const handlePriorityClick = async (newPriority: string) => {
        setSelectedPriority(newPriority); // Update UI instantly
        await handlePriorityChange(task._id, newPriority); // Update backend
        onTaskUpdated(); // Refresh task list
    };

    const handleDeleteClick = async () => {
        await handleDelete(task._id);
        onTaskUpdated();
    };

    const trash = {
        animationData: trashLottie,
        loop: true
    }

    return (
        <Card className={`flex flex-row flex-wrap mb-3 justify-between items-center px-6 bg-white border-3 border-transparent ${isCompleted ? "border-dashed border-3 border-amber-300 bg-amber-50" : ""}`}>
            <div className="flex gap-4 items-center">
                <button onClick={() => { handleToggleClick(); }}>
                    <div className={`border rounded-md border-gray-200 p-2 cursor-pointer transition ${isCompleted ? "bg-amber-300 hover:bg-amber-600 text-white" : "hover:bg-black hover:text-white"}`}>
                        <CheckCircle2Icon />
                    </div>
                </button>
                <h3 className={`${isCompleted ? "line-through" : ""}`}>{task.title}</h3>
                {/* <p className={`${isCompleted ? "line-through" : ""}`}>{task.description}</p> */}
                {task.description &&
                    <Badge variant={"hashtag"}> <span className="text-[#2f2b43]"># {task.description}</span></Badge>
                }
            </div>

            <div className="flex gap-4 items-center">

                <PriorityBadge priority={task.priority} />

                <Popover>
                    <PopoverTrigger><EllipsisVerticalIcon className="text-gray-400 cursor-pointer hover:text-black transition" /></PopoverTrigger>
                    <PopoverContent className="bg-white flex justify-center items-center gap-2">

                        {/* DELETE DIALOG */}
                        <Dialog>
                            <DialogTrigger>
                                <button className="border rounded-md border-gray-200 p-2 hover:bg-black transition bg-white hover:text-white cursor-pointer">
                                    <Trash2Icon />
                                </button>
                            </DialogTrigger>
                            <DialogContent className="font-poppins bg-white flex flex-col justify-center items-center">
                                <div className="h-[100px] w-auto">
                                    <Lottie options={trash} />
                                </div>
                                <DialogHeader>Are you sure?</DialogHeader>
                                <button onClick={() => {
                                    handleDeleteClick();
                                    toast.success("Task has been successfully deleted!")
                                }} className="border rounded-md border-gray-200 p-2 w-full bg-black text-white transition hover:scale-95 cursor-pointer">
                                    Delete
                                </button>
                            </DialogContent>
                        </Dialog>

                        <Select onValueChange={handlePriorityClick}>
                            <SelectTrigger className="flex-1">
                                <SelectValue placeholder={selectedPriority}></SelectValue>
                            </SelectTrigger>
                            <SelectContent className="bg-white font-poppins">
                                <SelectItem className="hover:bg-[#2f2b43] hover:text-white transition" value="High">High</SelectItem>
                                <SelectItem className="hover:bg-[#2f2b43] hover:text-white transition" value="Medium">Medium</SelectItem>
                                <SelectItem className="hover:bg-[#2f2b43] hover:text-white transition" value="Low">Low</SelectItem>
                            </SelectContent>
                        </Select>


                    </PopoverContent>
                </Popover>
            </div>
        </Card>
    );
}
