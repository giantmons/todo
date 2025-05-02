
import {
     CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { loginUser } from "@/services/authService"
import { motion } from "framer-motion"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function LoginPage() {
    const [message, setMessage] = useState("")
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage("")

        try {
            const { email, password } = formData;
            const data = await loginUser(email, password)
            console.log("Login Successful", data)
            console.log(data?.success)

            if (data?.success) {
                setMessage("Login Successful! Redirecting...");
                localStorage.setItem("token", data.token);
                console.log("Token received:", data.token);
                console.log("Navigating to /dashboard...");
                navigate("/dashboard");
            }
        } catch (error: any) {
            console.error("Login error error:", error);
            setMessage(`❌ Error: ${error.response?.data?.message || "Failed to connect to the server."}`);
        }

    }

    return <>
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 font-poppins bg-blue-50">
            <div className="w-full max-w-sm bg-blue-50">
                <div className="flex flex-col gap-6">
                    <motion.div initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }} className="bg-[#2f2b43] text-white relative flex flex-col gap-6 rounded-xl py-8 shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-2xl">Login</CardTitle>
                            <CardDescription>
                                Enter your email below to login to your account
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit}>
                                <div className="flex flex-col gap-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            className="placeholder:text-gray-400 bg-white text-black"
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="m@example.com"
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <div className="flex items-center">
                                            <Label htmlFor="password">Password</Label>
                                            <a
                                                href="#"
                                                className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                            >
                                                Forgot your password?
                                            </a>
                                        </div>
                                        <Input className="placeholder:text-gray-400 bg-white text-black" id="password" placeholder="Enter your password" name="password" type="password" onChange={handleChange} required />
                                    </div>
                                    <motion.button initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8, ease: "easeOut" }} type="submit" className="absolute -bottom-16 p-4 rounded-xl left-0 w-full bg-black text-white cursor-pointer">
                                        Login
                                    </motion.button>
                                    {message && <p className="text-sm text-center mt-2">{message}</p>}
                                </div>
                                <div className="mt-4 text-center text-sm">
                                    Don&apos;t have an account?{" "}
                                    <a href="#" className="underline underline-offset-4" onClick={() => navigate("/register")}>
                                        Sign up
                                    </a>
                                </div>
                            </form>
                        </CardContent>
                    </motion.div>
                </div>
            </div>
            <div className="absolute bottom-3">
                <p className="font-poppins text-gray-400 text-sm">@2025 Leuan Santos. All rights reserved.</p>
            </div>
        </div>
    </>
}