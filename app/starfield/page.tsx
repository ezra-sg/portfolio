import dynamic from 'next/dynamic';

const Starfield = dynamic(() => import("@/components/starfield/starfield"), { ssr: false })

export default function StarfieldPage() {
    return <Starfield />;
}
