import { Dispatch, FC, SetStateAction } from 'react';

interface TextInputProps {
    value: string;
    onChange: Dispatch<SetStateAction<string>>;
    placeholder: string;
    type?: 'text' | 'password';
}

/**
 * Styled text input for text and password fields.
 */
export const TextInput: FC<TextInputProps> = ({
    value,
    onChange,
    placeholder,
    type = 'text',
}) => {
    return (
        <input
            onChange={(e) => onChange(e.currentTarget.value)}
            value={value}
            className="h-[49px] w-[395px] rounded-lg border border-primary indent-3 font-secondary text-lg font-light text-primary placeholder-primary focus:outline-none focus:ring focus:ring-secondary"
            placeholder={placeholder}
            type={type}
        />
    );
};
