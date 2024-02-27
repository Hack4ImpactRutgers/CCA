'use client';
import { FC, useState } from 'react';
import Image from 'next/image';

interface Collapsible {
    title: string;
    content: string;
}

export const Collapsible: FC<Collapsible> = ({ title, content }) => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    return (
        <div>
            <div className="flex h-[73px] items-center justify-between bg-secondary">
                <div className="text-2xl font-bold text-white">{title}</div>
                <button onClick={() => setIsCollapsed(!isCollapsed)}>
                    <Image
                        className={`transition-transform ${
                            isCollapsed ? 'rotate-180' : 'rotate-0'
                        }`}
                        src="/svgs/up-arrow.svg"
                        alt="up arrow"
                        width={61}
                        height={61}
                    />
                </button>
            </div>
            <div
                // TODO: fix this transition.
                className={`overflow-hidden transition-all duration-500 ${
                    isCollapsed && 'hidden'
                }`}
            >
                {content}
            </div>
        </div>
    );
};
