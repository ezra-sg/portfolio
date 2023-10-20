import React, { useEffect, useRef, useState } from 'react';

import { MdClose } from 'react-icons/md';

import { useI18n } from '@/hooks/useI18n';

export type ModalProps = {
    description: string;
    title: string;
    trigger: React.ReactNode;
    children: React.ReactNode;
};

export default function Modal({ children, description, title, trigger }: ModalProps) {
    const [modalIsVisible, setModalIsVisible] = useState(false);
    const dialogRef = useRef<HTMLDialogElement | null>(null);
    const dialogInnerRef = useRef<HTMLDivElement | null>(null);

    const { t } = useI18n();

    function handleModalVisibilityChange(visible: boolean) {
        if (visible) {
            dialogRef.current?.showModal();
            document.body.setAttribute('inert', 'true');
            document.body.style.overflow = 'hidden';
            document.body.style.filter = 'blur(2px)';
        } else {
            dialogRef.current?.close();
            document.body.removeAttribute('inert');
            document.body.style.overflow = '';
            document.body.style.filter = '';
        }
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!dialogRef.current || !dialogInnerRef.current) {
                return;
            }
            const clickedElement = event.target as HTMLElement;
            const userClickedAway = !dialogInnerRef.current.contains(clickedElement);

            if (userClickedAway) {
                setModalIsVisible(false);
            }
        };

        const dialog = dialogRef.current;
        const handleDialogClose = () => setModalIsVisible(false);

        document.addEventListener('mousedown', handleClickOutside);
        dialog?.addEventListener('close', handleDialogClose);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            dialog?.removeEventListener('close', handleDialogClose);
        };
    }, []);

    useEffect(() => {
        handleModalVisibilityChange(modalIsVisible);
    }, [modalIsVisible]);

    // eztodo make all markdown slugs have md in the name

    return (<>
        <div
            role="button"
            aria-haspopup="dialog"
            aria-expanded={modalIsVisible}
            tabIndex={0}
            onClick={() => setModalIsVisible(true)}
            title={description}
        >
            {trigger}
        </div>

        <dialog
            ref={dialogRef}
            aria-modal="true"
            className={`${modalIsVisible ? 'flex' : ''} w-[90vw] min-h-[40vh] max-h-[80vh] fixed top-0 right-0 bottom-0 left-0 items-center justify-center backdrop:bg-stone-900 backdrop:opacity-90`}
        >
            <div className="relative w-[90vw] min-h-[40vh] max-h-[80vh]">
                <div ref={dialogInnerRef}>
                    <header className="sticky top-0 left-0 right-0 shadow-sm flex justify-between items-center bg-amber-50 dark:bg-stone-900">
                        <div className="ml-4 my-2 dark:text-amber-50">
                            <h1 className="font-header">
                                {title}
                            </h1>
                            <p className="text-xs italic">{t('global.audio_transtript')}</p>
                        </div>


                        {/* eztodo a11y here */}
                        <button
                            className="h-8 w-8 m-4 flex items-center justify-center rounded-full border-[1px] border-amber-900 hover:scale-105 dark:border-amber-200"
                            onClick={() => setModalIsVisible(false)}
                        >
                            <MdClose className="text-xl text-amber-900 dark:text-amber-200" />
                        </button>
                    </header>

                    <div className="p-4 dark:bg-slate-950 dark:text-amber-50">
                        {children}
                    </div>
                </div>
            </div>

        </dialog>
    </>);
}
