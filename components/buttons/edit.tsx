'use client';

import { IButton } from "@/types";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { Button } from "@tremor/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EditBtn({ id, type }: IButton) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    return (
        <Button
            icon={PencilSquareIcon}
            size="xs"
            color="blue"
            onClick={() => {
                router.push(`/admin/${type}/${id}/edit`);
                setLoading(true);
            }}
            loading={loading}
        >
            Edit
        </Button>
    );
}
