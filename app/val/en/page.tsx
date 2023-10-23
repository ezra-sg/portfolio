import ValHomeEn from './val-home-en';
import en from '@/i18n/en.json' assert { type: 'json' };

export default async function ValPageEn() {
    return <ValHomeEn translations={en} />;
}
