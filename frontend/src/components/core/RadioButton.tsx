import { FC } from 'react';

interface RadioButtonProps {
    value: string;
}

export const RadioButton: FC<RadioButtonProps> = ({ value }) => {
    return (
        <input
            type="radio"
            value={value}
            className="bg-[#D9D9D9] text-secondary focus:ring-secondary"
        />
    );
};
