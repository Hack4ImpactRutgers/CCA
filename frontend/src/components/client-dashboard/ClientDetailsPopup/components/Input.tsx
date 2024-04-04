import { FC, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input: FC<InputProps> = (props) => {
    return (
        <input
            {...props}
            className="h-[48px] w-full border-0 bg-[#F2F2F2] focus:ring-1 focus:ring-primary"
        />
    );
};
