import ValHomeEs from './val-home-es';
import globalEs from '@/i18n/global/es.json' assert { type: 'json' };
import valEs from '@/i18n/val/es.json' assert { type: 'json' };

export default async function ValPageEs() {
    return <ValHomeEs translations={Object.assign(globalEs, valEs, {})} />;
}
