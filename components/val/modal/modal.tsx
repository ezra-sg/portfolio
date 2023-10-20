import React, { useEffect, useRef, useState } from 'react';

import { MdClose } from 'react-icons/md';

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

    function handleModalVisibilityChange(visible: boolean) {
        if (visible) {
            dialogRef.current?.showModal();
            document.body.setAttribute('inert', 'true');
            document.body.style.overflow = 'hidden';
        } else {
            dialogRef.current?.close();
            document.body.removeAttribute('inert');
            document.body.style.overflow = '';
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
            className={`${modalIsVisible ? 'flex' : ''} fixed top-0 right-0 bottom-0 left-0 items-center justify-center backdrop:bg-stone-900 backdrop:opacity-90`}
        >
            <div
                ref={dialogInnerRef}
                className="w-[80vw] min-h-[40vh] max-h-[80vh] relative"
            >
                <div className="absolute top-0 left-0 right-0 flex justify-between items-center bg-amber-50">
                    <h1 className="font-header">{title}</h1>

                    {/* eztodo a11y here */}
                    <button
                        className="p-4"
                        onClick={() => setModalIsVisible(false)}
                    >
                        <MdClose />
                    </button>
                </div>

                <div className="pt-8">
                    {children}
                </div>
            </div>
        </dialog>
    </>);
}
