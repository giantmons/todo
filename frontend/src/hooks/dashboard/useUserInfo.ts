import { getUserInfo } from "@/services/userService"
import { useEffect, useState } from "react"

export const useUserInfo = () => {
    const [userInfo, setUserInfo] = useState<{username?: string, success?: boolean}>({})

    useEffect(() => {
        const access = localStorage.getItem("token");
        if (!access) return
    
        const handleFetch = async () => {
    
            try {
                const response = await getUserInfo(access);
                setUserInfo(response)
            } catch (error) {
                console.error("Error useUserInfo:", error);
            }
        }
        console.log("USER INFO IS", userInfo)
        handleFetch();
    }, [])



    return userInfo
}