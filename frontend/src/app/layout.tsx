'use client';
import { createContext, FC, PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import { Navbar } from '@/components/core/Navbar';
import './globals.css';
import { UserContext, UserProvider } from '@/context/userContext';

// export const metadata: Metadata = {
//     title: 'AniMeals on Wheels',
//     description:
//         'Combined Community Action - AniMeals on Wheels admin management app.',
//     creator: 'Hack4Impact Rutgers Chapter',
// };

interface RootLayoutProps extends PropsWithChildren {}

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
    return (
        <html lang="en">
            <body>
                <UserProvider>
                    <Navbar />
                    <div className="z-[100] mt-[112px]">{children}</div>
                </UserProvider>
            </body>
        </html>
    );
};

export default RootLayout;
