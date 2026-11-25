"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav>
            <ul className="flex gap-4 justify-between">
                <li>
                    <Link href={"/"} className={`text-md text-gray-600 font-text ${pathname === "/" && "font-bold"}`}> Главная </Link>
                </li>
                <li>
                    <Link href="/knowledge" className={`text-md text-gray-600 font-text ${pathname == "/knowledge" && "font-bold"}`}>База знаний</Link>
                </li>
                <li><Link href="/calculator" className={`text-md text-gray-600 font-text ${pathname == "/calculator" && "font-bold"}`}>Калькуляторы</Link></li>
            </ul>
        </nav>
    )
}