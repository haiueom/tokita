'use client';

import { Button } from "@tremor/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IButton } from "@/types";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

export default function BackBtn({ type }: IButton) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    return (
        <Button
            loading={loading}
            icon={ArrowLeftIcon}
            onClick={() => {
                router.push(`/admin/${type}`);
                setLoading(true);
            }}
        >
            Back
        </Button>
    );
}
