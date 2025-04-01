import { markTaskComplete } from "@/services/taskService"

export const useMarkTaskComplete = () => {

    const handleMarkTaskComplete = async (taskId: string) => {

        try {
            const access = localStorage.getItem("token")
            if (!access) return;

            const response = await markTaskComplete(taskId, access)
            if(response.success) {
                console.log("Task Successfully Marked as done!", response.success)
            }
        } catch (error) {
            console.log("Failed to mark task as done", error)
        }
    }

    return { handleMarkTaskComplete }
}