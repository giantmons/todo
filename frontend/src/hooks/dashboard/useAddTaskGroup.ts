import { addTaskGroup } from "@/services/taskService"

const useAddTaskGroup = () => {
    const access = localStorage.getItem("token")
    if (!access) return 

    const handleAddTaskGroup = async (title: string, description: string) => {
        try {
            const data = await addTaskGroup(title, description, access)
            console.log("Successfully created task group: ", data)
        } catch (error) {
            console.error("Failed creating task group: ", error)
        }
    }

    return { handleAddTaskGroup }
}

export default useAddTaskGroup