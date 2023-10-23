import ValHomeEs from './val-home-es';
import es from '@/i18n/es.json' assert { type: 'json' };

export default async function ValPageEs() {
    return <ValHomeEs translations={es} />;
}
