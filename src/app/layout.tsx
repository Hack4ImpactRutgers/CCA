import { FC, PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import { Navbar } from '@/components/core/Navbar';
import './globals.css';

export const metadata: Metadata = {
    title: 'AniMeals on Wheels',
    description:
        'Combined Community Action - AniMeals on Wheels admin management app.',
    creator: 'Hack4Impact Rutgers Chapter',
};

interface RootLayoutProps extends PropsWithChildren {}

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
    return (
        <html lang="en">
            <body>
                <Navbar />
                <div className="mt-[112px]">{children}</div>
            </body>
        </html>
    );
};

export default RootLayout;
