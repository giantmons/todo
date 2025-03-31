import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { registerUser } from "@/services/authService";
import { useState } from "react";

export default function RegisterPage() {
    const [message, setMessage] = useState("")
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    })

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
        <form onSubmit={handleRegister}>
            <Input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
            <Input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            <Input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required/>
            <Button type="submit" className="cursor-pointer w-full">Submit</Button>
        </form>

        {message && <p className="text-sm text-center mt-2">{message}</p>}
    </>
}