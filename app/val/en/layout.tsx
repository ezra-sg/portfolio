import type { Metadata } from 'next';
import Page from './page';

export const metadata: Metadata = {
    metadataBase: new URL('https://ezra-sg.com/'),
    title: 'Goose | An afternoon with Valentín Guzman',
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

export default Page;
