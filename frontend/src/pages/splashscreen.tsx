import logo from "@/assets/taskly-logo.png"
import note from "@/assets/lottie/note.json"
import Lottie from "react-lottie"
import blob from "@/assets/lottie/blob.json"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

const notebook = {
    animationData: note,
    loop: false
}

const bloBg = {
    animationData: blob,
    loop: true
}

export default function Splashscreen() {

    const navigate = useNavigate()

    return <>
        <div className="min-h-screen flex justify-center items-center bg-blue-50">
            <div className="h-[400px] w-[350px] gap-3 flex flex-col justify-center items-center">
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <motion.img
                        src={logo}
                        alt="taskly-logo"
                        animate={{ scale: [1, 1.04, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="h-20 w-auto"
                    />
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }} className="relative flex justify-center items-center flex-1 bg-[#2f2b43] w-full rounded-xl overflow-hidden">
                    <div className="w-[200px] z-20">
                        <Lottie options={notebook} />
                    </div>
                    <div className="absolute inset-0 -bottom-[270px] opacity-20 pointer-events-none">
                        <Lottie options={bloBg} />
                    </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }} className="flex w-full gap-3 font-poppins text-sm">
                    <button className="border flex-1 p-4 rounded-xl bg-[#2f2b43] text-white cursor-pointer border-none transition hover:bg-[#9782f5]" onClick={() => { navigate("/login") }}>Log in</button>
                    <button className="border flex-1 p-4 rounded-xl bg-[#2f2b43] text-white cursor-pointer border-none transition hover:bg-[#9782f5]" onClick={() => { navigate("/register") }}>Sign up</button>
                </motion.div>
            </div>

            <div className="absolute bottom-3">
                <p className="font-poppins text-gray-400 text-sm">@2025 Leuan Santos. All rights reserved.</p>
            </div>
        </div>
    </>

}