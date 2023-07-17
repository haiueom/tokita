'use client';

import { EyeIcon } from "@heroicons/react/24/solid";
import { Button } from "@tremor/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ViewBtn({ id }: { id: string }) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    return (
        <Button
            icon={EyeIcon}
            size="xs"
            color="green"
            onClick={() => {
                router.push(`/admin/product/${id}`);
                setLoading(true);
            }}
            loading={loading}
        >
            View
        </Button>
    );
}
