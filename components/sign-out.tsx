'use client';
import { signOut } from 'next-auth/react';

export default function SignOut() {
    return (
        <button
            className="text-stone-400 transition-all hover:text-stone-200"
            onClick={() => signOut()}
        >
            Goddammit, sign me out!
        </button>
    );
}
