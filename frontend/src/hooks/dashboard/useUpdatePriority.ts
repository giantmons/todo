import { updateTaskPriority } from "@/services/taskService"
import { useState } from "react"

export const useUpdatePriority = () => {
    const [priority, setPriority] = useState()

    const handlePriorityChange = async (taskId: string, newPriority: string) => {
        const access = localStorage.getItem("token");
        if (!access) return

        try {
            const response = await updateTaskPriority(taskId, newPriority, access)
            setPriority(response)
        } catch (error) {
            console.log("ERROR SETTING PRIORITY:", error)
        }
    }

    return {handlePriorityChange, priority};
}