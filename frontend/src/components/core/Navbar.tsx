'use client';
import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Navbar: FC = () => {
    const pathname = usePathname();
    return (
        <nav className="fixed top-0 z-50 flex h-28 w-full items-center justify-between bg-tertiary px-[30px]">
            <Link href="/">
                <Image src="/svgs/logo.svg" alt="logo" width={87} height={87} />
            </Link>
            <div className="flex gap-10 text-white">
                <Link
                    href="/volunteer"
                    className={`transition-colors ${
                        pathname === '/volunteer' ? 'text-primary' : ''
                    }`}
                >
                    Volunteer
                </Link>
                <Link
                    href="/client"
                    className={`transition-colors ${
                        pathname === '/client' ? 'text-primary' : ''
                    }`}
                >
                    Client
                </Link>
                <Link
                    href="/contact"
                    className={`transition-colors ${
                        pathname === '/contact' ? 'text-primary' : ''
                    }`}
                >
                    Contact
                </Link>
            </div>
            <Link
                href="/login"
                className={`text-2xl transition-colors ${
                    pathname === '/login' ? 'text-primary' : 'text-white'
                }`}
            >
                SIGN IN
            </Link>
        </nav>
    );
};
