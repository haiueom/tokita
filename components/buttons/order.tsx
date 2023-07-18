'use client';

import { Button } from "@tremor/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowUpRightIcon } from "@heroicons/react/24/solid";
import { Product } from "@/types";

interface ButtonProps {
    text: string;
    product: Product;
}

export default function OrderBtn({ text, product } : ButtonProps) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    return (
        <Button
            loading={loading}
            icon={ArrowUpRightIcon}
            onClick={() => {
                router.push(`https://api.whatsapp.com/send?phone=6285792549522&text=Halo%20admin%2C%20saya%20mau%20order!%0ANama%3A%20%0ANama%20Barang%3A%20A${product.name}%0AHarga%3A%20${product.price}%0A%0ATerima%20kasih%20%F0%9F%98%8A}`)
                setLoading(true);
            }}
        >
            {text}
        </Button>
    );
}
