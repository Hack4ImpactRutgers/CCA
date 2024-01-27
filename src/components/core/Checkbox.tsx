import { ChangeEventHandler, FC } from 'react';

interface CheckboxProps {
    checked: boolean;
    onChange: ChangeEventHandler<HTMLInputElement>;
}

export const Checkbox: FC<CheckboxProps> = ({ checked, onChange }) => {
    return (
        <input
            type="checkbox"
            value=""
            checked={checked}
            onChange={onChange}
            className="border-0 bg-[#D9D9D9] text-secondary focus:ring-secondary"
        />
    );
};
