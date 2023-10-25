import ValHomeEn from './val-home-en';
import globalEn from '@/i18n/global/en.json' assert { type: 'json' };
import valEn from '@/i18n/val/en.json' assert { type: 'json' };

export default async function ValPageEn() {
    return <ValHomeEn translations={Object.assign(globalEn, valEn, {})} />;
}
