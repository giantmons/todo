import axios from "axios";

const LOCALSERVER = "http://localhost:5003/api"

export const getUserInfo = async (access: string) => {
    try {
        const response = await axios.get(
            `${LOCALSERVER}/user/me`, {
                headers: {
                    "Authorization" : `Bearer ${access}`,
                    "Content-Type" : "application/json"
                }
            }
        )
        console.log(response.data)
        return response.data
    } catch (error) {
        console.error("User info GET ERROR:", error)
    }
}