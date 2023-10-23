import { AiOutlineLoading } from 'react-icons/ai';

export default function ValHomeLoading() {
    return (
        <div className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-amber-50 dark:bg-stone-950">
            <AiOutlineLoading className="animate-spin" />
        </div>
    );
}
