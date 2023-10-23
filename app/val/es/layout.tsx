import type { Metadata } from 'next';
import Page from './page';

export const metadata: Metadata = {
    title: 'Goose | Una tarde con el Dr. Valentín Guzmán',
    openGraph: {
        title: 'Goose | Una tarde con el Dr. Valentín Guzmán',
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
