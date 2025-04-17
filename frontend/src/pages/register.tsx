import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerUser } from "@/services/authService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
    const [message, setMessage] = useState("")
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
            const data = await registerUser(username, email, password)
            console.log("Registration Successful!", data)

            if (data?.success) {
                setMessage("Registration Successful!")
            } else {
                setMessage(`❌ Error: ${data?.error || "Something went wrong."}`);
            }

        } catch (error: any) {
            setMessage(`Error: ${error.response?.data?.message || "Failed to connect to the server."}`);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return <>
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 font-poppins">
            <div className="w-full max-w-sm">
                <div className="flex flex-col gap-6">
                    <Card>
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
                                        <div className="flex items-center">
                                            <Label htmlFor="password">Password</Label>
                                        </div>
                                        <Input
                                            id="password"
                                            name="password"
                                            type="password"
                                            placeholder="Password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <Button type="submit" className="w-full bg-black text-white cursor-pointer">
                                        Submit
                                    </Button>
                                    {message && <p className="text-sm text-center mt-2">{message}</p>}
                                </div>
                                <div className="mt-4 text-center text-sm">
                                    Already have an account?{" "}
                                    <a href="#" className="underline underline-offset-4" onClick={() => navigate("/")}>
                                        Login here
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