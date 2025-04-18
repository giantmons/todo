import { deleteTaskGroup } from "@/services/taskService"
import { useState } from "react";

const useDeleteTaskGroup = () => {
    const [message, setMessage] = useState("")

    const handleDeleteTaskGroup = async (taskGroupId: string) => {
        const access = localStorage.getItem("token");
        if (!access) return

        try {
            const response = await deleteTaskGroup(taskGroupId, access)
            if (response.success) {
                setMessage("Task Group successfully deleted!");
                console.log("Task Group Successfully deleted", response);
            } else {
                setMessage(`Failed to delete task group: ${response.error}`);
                console.error("Failed to delete task group:", response.error);
            }
        } catch (error) {
            
        }
    }

    return { handleDeleteTaskGroup, message }

}

export default useDeleteTaskGroup