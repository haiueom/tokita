'use client';

import { Button } from "@tremor/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BackBtn() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    return (
        <Button
            loading={loading}
            onClick={() => {
                router.push("/admin/product");
                setLoading(true);
            }}
        >
            Back
        </Button>
    );
}
