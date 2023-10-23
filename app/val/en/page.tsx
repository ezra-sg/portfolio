import ValHomeEn from './val-home-en';

export default async function ValPageEn() {
    const { default: translations } = await import('@/i18n/en.json');

    return <ValHomeEn translations={translations} />;
}
