'use client';

import { FC, PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import { Navbar } from '@/components/core/Navbar';
import './globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// TODO: fix.
// export const metadata: Metadata = {
//     title: 'AniMeals on Wheels',
//     description:
//         'Combined Community Action - AniMeals on Wheels admin management app.',
//     creator: 'Hack4Impact Rutgers Chapter',
// };

interface RootLayoutProps extends PropsWithChildren {}

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
    const queryClient = new QueryClient();

    return (
        <html lang="en">
            <body>
                <QueryClientProvider client={queryClient}>
                    <Navbar />
                    <div className="mt-[112px]">{children}</div>
                </QueryClientProvider>
            </body>
        </html>
    );
};

export default RootLayout;
