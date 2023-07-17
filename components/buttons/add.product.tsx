'use client';

import { Button } from "@tremor/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddBtn() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    return (
        <Button
            loading={loading}
            onClick={() => {
                router.push("/admin/product/add");
                setLoading(true);
            }}
        >
            Add Product
        </Button>
    );
}
