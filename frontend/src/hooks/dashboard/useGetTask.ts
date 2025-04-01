import { getTasks } from "@/services/taskService";
import { useEffect, useState } from "react";

export const useGetTask = (refreshTrigger: boolean) => {
    const [userTask, setUserTask] = useState<task[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const access = localStorage.getItem("token");
            if (!access) {
                console.log("No token found.");
                return;
            }

            try {
                const data = await getTasks(access);
                console.log("Fetched Tasks in Hook:", data); // <-- Debugging
                setUserTask(data);
            } catch (error) {
                console.error("Error fetching user tasks", error);
            }
        };

        fetchData();
    }, [refreshTrigger]);

    return userTask;
};
