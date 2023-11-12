import type { Metadata } from 'next';
import Page from './page';

export const metadata: Metadata = {
    metadataBase: new URL('https://ezra-sg.com/'),
    title: 'Goose | Una tarde con el Dr. Valentín Guzmán',
    description: 'Una página dedicada a la vida de Valentín Guzmán, mi padre.',
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
