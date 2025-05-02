import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { registerUser } from "@/services/authService"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

export default function RegisterPage() {
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    })

    const navigate = useNavigate()

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage("")

        try {
            const { username, email, password } = formData;
            setLoading(true)
            const data = await registerUser(username, email, password)
            console.log("Registration Successful!", data)

            if (data?.success) {
                setMessage("Registration Successful!")
                setLoading(false)
            } else {
                setMessage(`❌ Error: ${data?.error || "Something went wrong."}`);
                setLoading(false)
            }

        } catch (error: any) {
            setMessage(`Error: ${error.response?.data?.message || "Failed to connect to the server."}`);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 font-poppins bg-blue-50">
            <div className="w-full max-w-sm bg-blue-50">
                <div className="flex flex-col gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="bg-[#2f2b43] text-white relative flex flex-col gap-6 rounded-xl py-12 shadow-sm"
                    >
                        <CardHeader>
                            <CardTitle className="text-2xl">Register</CardTitle>
                            <CardDescription>
                                Create an account by filling in the details below.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleRegister}>
                                <div className="flex flex-col gap-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="username">Username</Label>
                                        <Input
                                            className="placeholder:text-gray-400 bg-white text-black"
                                            id="username"
                                            name="username"
                                            type="text"
                                            placeholder="Username"
                                            value={formData.username}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            className="placeholder:text-gray-400 bg-white text-black"
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="m@example.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="password">Password</Label>
                                        <Input
                                            className="placeholder:text-gray-400 bg-white text-black"
                                            id="password"
                                            name="password"
                                            type="password"
                                            placeholder="Enter your password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <motion.button
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8, ease: "easeOut" }}
                                        type="submit"
                                        disabled={loading}
                                        className="absolute -bottom-16 p-4 rounded-xl left-0 w-full bg-black text-white cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {loading && (
                                            <svg
                                                className="animate-spin h-5 w-5 text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                                ></path>
                                            </svg>
                                        )}
                                        {loading ? 'Submitting...' : 'Submit'}
                                    </motion.button>

                                    {message && <p className="text-sm text-center mt-2">{message}</p>}
                                </div>
                                <div className="mt-4 text-center text-sm">
                                    Already have an account?{" "}
                                    <a href="#" className="underline underline-offset-4" onClick={() => navigate("/login")}>
                                        Login here
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
    )
}
