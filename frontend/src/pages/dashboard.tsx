import { useAddTask } from "@/hooks/dashboard/useAddTask";
import { useDeleteTask } from "@/hooks/dashboard/useDeleteTask";
import { useGetTask } from "@/hooks/dashboard/useGetTask";
import { useMarkTaskComplete } from "@/hooks/dashboard/useMarkTaskComplete";
import { useState } from "react";

export default function Dashboard() {
    const [refreshTrigger, setRefreshTrigger] = useState(false);
    const tasks = useGetTask(refreshTrigger);
    const {handleDelete, messageDelete} = useDeleteTask()
    const {handleMarkTaskComplete} = useMarkTaskComplete();
    const { addNewTask, message } = useAddTask();

    const [formData, setFormData] = useState({
        title: "",
        description: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleDeleteClick = async (taskId: string) => {
        await handleDelete(taskId);
        setRefreshTrigger((prev) => !prev); // ✅ This triggers re-fetching
    };

    const handleMarkTaskCompleteClick = async (taskId: string) => {
        await handleMarkTaskComplete(taskId);
        setRefreshTrigger((prev) => !prev); // ✅ This triggers re-fetching
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await addNewTask(e, formData);
        setRefreshTrigger((prev) => !prev); // ✅ This triggers re-fetching
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" placeholder="Title" onChange={handleChange} required />
                <input type="text" name="description" placeholder="Description" onChange={handleChange} required />
                <button type="submit">Submit</button>
                {message && <p>{message}</p>}
            </form>

            <div>
                <h1>Welcome to Your Tasks</h1>
                <ul>
                    {tasks.length > 0 ? (
                        tasks.map((task) => (
                            <li key={task._id}>
                                <h3>{task.title}</h3>
                                <p>{task.description}</p>
                                <p>{task.completed ? "completed" : "Incomplete"}</p>
                                <button onClick={() => handleDeleteClick(task._id)}>Delete</button>
                                <button onClick={() => handleMarkTaskCompleteClick(task._id)}>Mark as Done</button>
                                {/* {messageDelete && <p>Deleted Successfully</p>} */}
                            </li>
                        ))
                    ) : (
                        <p>No tasks found</p>
                    )}
                </ul>
            </div>
        </>
    );
}

