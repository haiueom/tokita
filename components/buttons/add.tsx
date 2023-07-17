'use client';

import { Button } from "@tremor/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IButton } from "@/types";
import { PlusIcon } from "@heroicons/react/24/solid";

export default function AddBtn({ type }: IButton) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    function toTitleCase(text: string) {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

    return (
        <Button
            loading={loading}
            icon={PlusIcon}
            onClick={() => {
                router.push(`/admin/${type}/add`);
                setLoading(true);
            }}
        >
            Add {toTitleCase(`${type}`)}
        </Button>
    );
}
