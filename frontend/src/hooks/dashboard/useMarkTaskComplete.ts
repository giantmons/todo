import { toggleTaskComplete } from "@/services/taskService"
import { useState } from "react"

export const useMarkTaskComplete = (taskId: string, initialStatus: boolean) => {
    const [completed, setCompleted] = useState(initialStatus);

    const handleToggle = async () => {

        try {
            const access = localStorage.getItem("token")
            if (!access) return;

            const response = await toggleTaskComplete(taskId, access)
            setCompleted(response.completed)
            if(response.success) {
                console.log("Task Successfully Marked as done!", response.success)
            } else {
                console.log("Failed to toggle completion: ", response.message)
            }
        } catch (error) {
            console.log("Failed to mark task as done", error)
        }
    }

    return { completed ,handleToggle }
}