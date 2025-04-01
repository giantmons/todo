import { useAddTask } from "@/hooks/dashboard/useAddTask";
import { useGetTask } from "@/hooks/dashboard/useGetTask";
import { useState } from "react";

export default function Dashboard() {
    const { addNewTask, message } = useAddTask();
    const [formData, setFormData] = useState({
        title: "",
        description: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        console.log("FETCHED TASK", tasks)
    };

    const tasks = useGetTask();

    return (
        <>
            <form onSubmit={(e) => addNewTask(e, formData)}>
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
