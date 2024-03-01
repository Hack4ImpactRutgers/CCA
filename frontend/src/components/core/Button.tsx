import { ButtonHTMLAttributes, FC, MouseEventHandler } from 'react';
import Image from 'next/image';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
    iconPath?: string;
}

export const Button: FC<ButtonProps> = ({
    text,
    onClick,
    iconPath,
    ...rest
}) => {
    return (
        <button
            className="flex h-[55px] w-[227px] place-items-center justify-around rounded-[10px] border-2 border-[#017BAF] bg-secondary text-center font-secondary text-[18px] font-bold text-white"
            onClick={onClick}
            {...rest}
        >
            <span>{text}</span>
            {iconPath && (
                <Image
                    src={iconPath}
                    alt={text}
                    className="h-[38px] w-[38px]"
                    width={38}
                    height={38}
                />
            )}
        </button>
    );
};
