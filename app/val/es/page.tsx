import ValHomeEs from './val-home-es';

export default async function ValPageEs() {
    const { default: translations } = await import('@/i18n/es.json');

    return <ValHomeEs translations={translations} />;
}
