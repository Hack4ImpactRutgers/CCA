'use client';
import { FC, MouseEventHandler } from 'react';

interface LoginButton {
    text: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
    active: boolean;
}

export const LoginButton: FC<LoginButton> = ({ text, onClick, active }) => {
    return (
        <button
            onClick={onClick}
            className={`w-[120px] font-semibold transition-colors ${
                active && 'text-secondary'
            }`}
        >
            <div
                className={`mb-2 h-2 bg-secondary transition-transform ${
                    !active && 'scale-0'
                }`}
            />
            {text}
        </button>
    );
};
