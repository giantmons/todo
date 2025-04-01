import axios from "axios";

const LOCALSERVER = "http://localhost:5003/api";


//GET USER TASK
export const getTasks = async (access: string): Promise<any> => {
    try {
        const response = await axios.get(
            `${LOCALSERVER}/tasks/`,
            {
                headers: {
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${access}`
                }
            }
        );
        return response.data
    } catch (error) {
        console.error("User tasks GET error:", error)
        throw error;
    }
}


//ADD TASK
export const addTask = async (title: string, description: string, access: string) => {
    try {
        const response = await axios.post(
            `${LOCALSERVER}/tasks/`,
            {
                title,
                description
            },
            {
               headers: {
                    "Content-type" : "application/json",
                    "Authorization" : `Bearer ${access}`
               }
            }
        );
        return response.data
    } catch (error) {
        console.log("Adding task ERROR: ", error)
        throw error
    }
}

//DELETE TASK
export const deleteTask = async (taskId: string, access: string) => {
    try {
        const response = await axios.delete(`${LOCALSERVER}/tasks/${taskId}`, {
            headers: {
                "Authorization": `Bearer ${access}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error deleting task:", error);
        return { success: false, error };
    }
}

export const markTaskComplete = async (taskId: string, access: string) => {
    try {
        // Send an empty body since the task is being updated to completed
        const response = await axios.patch(
            `${LOCALSERVER}/tasks/${taskId}/complete`,  // URL for the API
            {},  // Empty body
            {
                headers: {
                    "Authorization": `Bearer ${access}`, // Pass the token as Authorization header
                },
            }
        );
        return response.data; // Return the response data
    } catch (error) {
        console.error("Error marking as done", error);  // Log the error if any
        throw error;  // Rethrow the error to handle it on the caller side
    }
};
