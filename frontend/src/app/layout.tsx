'use client';

import { FC, PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import { Navbar } from '@/components/core/Navbar';
import './globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Client } from '@/types/backend';

// TODO: fix
// export const metadata: Metadata = {
//     title: 'AniMeals on Wheels',
//     description:
//         'Combined Community Action - AniMeals on Wheels admin management app.',
//     creator: 'Hack4Impact Rutgers Chapter',
// };

interface RootLayoutProps extends PropsWithChildren {}

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
    const queryClient = new QueryClient();

    const client: Client = {
        id: 'abc123',
        name: 'John Doe',
        age: 35,
        address: '123 Main St',
        region: 'Urban',
        pets: [
            {
                id: 'p1',
                isActive: true,
                animal: 'Dog',
                vet: true,
                food: {
                    kind: 'Dry',
                    lbs: 10,
                },
            },
            {
                id: 'p2',
                isActive: true,
                animal: 'Cat',
                vet: false,
                food: {
                    kind: 'Wet',
                    lbs: 5,
                },
            },
        ],
    };

    return (
        <html lang="en">
            <body>
                <QueryClientProvider client={queryClient}>
                    <Navbar />
                    <div className="z-[100] mt-[112px]">{children}</div>
                </QueryClientProvider>
            </body>
        </html>
    );
};

export default RootLayout;
