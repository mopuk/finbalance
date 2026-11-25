import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.svg"
import Navbar from "./Navbar";

export default function Header() {
    return (
        <header className="flex justify-between items-center px-10 py-4">
            <div className="flex gap-8 items-center">
                <div>
                    <Image src={logo} width={140} height={32} alt="Logo" />
                </div>
                <Navbar />
            </div>
            <div className="font-text text-accent font-bold">
                Здравствуйте!
            </div>
        </header>
    )
}