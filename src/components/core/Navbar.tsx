import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export const Navbar: FC = () => {
    return (
        <nav className="flex h-28 items-center justify-between bg-tertiary px-[30px]">
            <Image src="/svgs/logo.svg" alt="logo" width={87} height={87} />
            <Link href="/login" className="text-2xl text-white">
                SIGN IN
            </Link>
        </nav>
    );
};
