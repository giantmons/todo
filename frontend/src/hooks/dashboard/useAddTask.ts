import { addTask } from "@/services/taskService";
import { useState } from "react";

export const useAddTask = () => {
    const [message, setMessage] = useState("");

    const addNewTask = async (e: React.FormEvent<HTMLFormElement>, formData: { title: string; description: string, priority: string }) => {
        e.preventDefault();
        setMessage("");

        try {
            const access = localStorage.getItem("token");
            if (!access) {
                console.log("No token found.");
                return;
            }

            const { title, description, priority } = formData;
            console.log("FORM DATA", formData)
            const data = await addTask(title, description, priority ,access);
            console.log("DATA SENT:", data)

            if (data?.success) {
                setMessage("Task is saved!");
            } else {
                console.error("DASDADS")
            }
        } catch (error) {
            console.log("POST Task error:", error);
            setMessage("Failed to connect to the server.");
        }
    };

    return { addNewTask, message };
};
