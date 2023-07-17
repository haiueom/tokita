import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";
import { poppins } from "@/lib/fonts";

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="h-full bg-gray-50">
            <body className={`${poppins.className} h-full`}>
                <Toaster />
                {children}
            </body>
        </html>
    );
}