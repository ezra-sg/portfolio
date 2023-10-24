import Script from 'next/script';

import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({
    subsets: ['latin'],
    preload: true,
});

export default function RootLayout({
    children,
}: {
  children: React.ReactNode
}) {
    return (
        <html lang="en">
            <Script data-goatcounter="https://ezra-sg.goatcounter.com/count" async src="//gc.zgo.at/count.js" />

            <body className={inter.className}>{children}</body>
        </html>
    );
}
