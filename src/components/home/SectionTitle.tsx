import { FC } from 'react';

interface SectionTitleProps {
    text: string;
}

export const SectionTitle: FC<SectionTitleProps> = ({ text }) => {
    return <p className="text-5xl font-bold text-primary">{text}</p>;
};
