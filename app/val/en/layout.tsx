import type { Metadata, Viewport } from 'next';
import Page from './page';

export const metadata: Metadata = {
    metadataBase: new URL('https://ezra-sg.com/'),
    title: 'Goose | An afternoon with Valentín Guzman',
    description: 'A page dedicated to the life of Valentín Guzman, my father.',
    openGraph: {
        title: 'Goose | An afternoon with Valentín Guzman',
    },
    keywords: ['Biography', 'Interview', 'Valentine Guzman', 'Valentín Guzman'],
    authors: [{ name: 'Ezra Sowden-Guzman', url: 'https://ezra-sg.com' }],
    creator: 'Ezra Sowden-Guzman',
    alternates: {
        canonical: '/val/en',
        languages: {
            'en': '/val/en',
            'es': '/val/es',
        },
    },
};

export const viewport: Viewport = {
    themeColor: [
        { media: '(prefers-color-scheme: dark)', color: '#0c0a09' },
        { media: '(prefers-color-scheme: light)', color: '#fffbeb' },
    ],
};

export default Page;
