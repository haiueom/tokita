'use client';

import Link from "next/link";

export default function Footer() {
    return (
        <footer className="w-full text-center p-4">
            <div className="flex flex-row gap-5 justify-center">
                <Link href="/">Home</Link>
                <Link href="/about">About</Link>
                <Link href="/contact">Contact</Link>
            </div>
            <p>&copy; 2023 Tokita. All rights reserved.</p>
        </footer>
    );
}
