import { deleteTask } from "@/services/taskService";
import { useState } from "react";

// Custom hook to handle task deletion
export const useDeleteTask = () => {
    const [messageDelete, setMessage] = useState("");

    const handleDelete = async (taskId: string) => {
        const access = localStorage.getItem("token");
        if (!access) return;

        try {
            const response = await deleteTask(taskId, access);
            if (response.success) {
                setMessage("Task successfully deleted!");
                console.log("Task Successfully deleted", response);
                // Optionally, refresh the tasks or update state to reflect the deletion
                window.location.reload(); // or update state to remove the deleted task
            } else {
                setMessage(`Failed to delete task: ${response.error}`);
                console.error("Failed to delete task:", response.error);
            }
        } catch (error) {
            setMessage("An error occurred while deleting the task.");
            console.error("Error deleting task:", error);
        }
    };

    return { handleDelete, messageDelete };
};
