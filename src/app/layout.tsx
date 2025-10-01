import "./global.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "NexGuard"
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <html lang="en">
            <body>
                {children}
            </body>
        </html>
    );
}
