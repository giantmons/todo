import { getTaskGroup } from "@/services/taskService"
import { useEffect, useState } from "react"

const useGetTaskGroup = () => {
    const [taskGroupData, setTaskGroupData] = useState<taskGroup[] | null>()
    
    useEffect(() => {

        const handleFetch = async () => {
            const access = localStorage.getItem("token");
            if (!access) return

            try {
                const data = await getTaskGroup(access)
                setTaskGroupData(data)
                console.log("Successfully got task groups data: ", data)
            } catch (error) {
                console.log("Error fetching task group data:", error)
            }
        }

        handleFetch()
    }, [])
    
    return taskGroupData
}

export default useGetTaskGroup;