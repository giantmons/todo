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