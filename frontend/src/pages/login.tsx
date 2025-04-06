import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { loginUser } from "@/services/authService"
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
        setFormData({ ...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage("")

        try {
            const {email, password} = formData;
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
            console.error("Login error:", error);
            setMessage(`❌ Error: ${error.response?.data?.message || "Failed to connect to the server."}`);
        }
        
    }

    return <>
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 font-poppins">
            <div className="w-full max-w-sm">
                <div className="flex flex-col gap-6">
                    <Card>
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
                                        <Input id="password" name="password" type="password" onChange={handleChange} required />
                                    </div>
                                    <Button type="submit" className="w-full bg-black text-white cursor-pointer">
                                        Login
                                    </Button>
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
                    </Card>
                </div>
            </div>
        </div>
    </>
}