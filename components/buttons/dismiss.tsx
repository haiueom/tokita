'use client';

import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function DismissButton() {
    const router = useRouter();

    return (
        <button
            className="contents text-blue-600 underline"
            onClick={() => {
                Cookies.set('template-banner-hidden', 'true');
                router.refresh();
            }}
        >
            Dismiss →
        </button>
    );
}
