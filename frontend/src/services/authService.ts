import axios from "axios";


const LOCALSERVER = "http://localhost:5003/api"

export const registerUser = async (username: string, email: string, password: string) => {
    try {
        const response = await axios.post(
            `${LOCALSERVER}/auth/register`,
            {
                username,
                email,
                password
            },
            {
                headers: {
                    'Content-Type' : 'application/json'
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error("Registration POST error: ", error);
        throw error
    }
}

export const loginUser = async (email: String, password: String) => {
    try {
        const response = await axios.post(
            `${LOCALSERVER}/auth/login`,
            {
                email, 
                password
            },
            {
                headers: {
                    "Content-Type" : "application/json"
                }
            }

        );
        return response.data
    } catch (error) {
        console.error("Login POST error:", error);
        throw error;
    }
}