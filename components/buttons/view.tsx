'use client';

import { IButton } from "@/types";
import { EyeIcon } from "@heroicons/react/24/solid";
import { Button } from "@tremor/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ViewBtn({ id, type }: IButton) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    return (
        <Button
            icon={EyeIcon}
            size="xs"
            color="green"
            onClick={() => {
                router.push(`/admin/${type}/${id}`);
                setLoading(true);
            }}
            loading={loading}
        >
            View
        </Button>
    );
}
