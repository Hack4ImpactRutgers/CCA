'use client';
import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useUserContext } from '@/context/userContext';

export const Navbar: FC = () => {
    const pathname = usePathname();
    const { accountType, setAccountType, setAccessToken } = useUserContext();
    const router = useRouter();

    const logout = () => {
        fetch(
            `${
                process.env.NEXT_PUBLIC_API_BASE_URL
            }/auth/${accountType.toLowerCase()}/logout`,
            {
                method: 'POST',
                credentials: 'include',
            }
        )
            .then((res) => {
                if (res.ok) {
                    setAccountType('');
                    setAccessToken('');
                    router.push('/');
                }
            })
            .catch((err) => console.error(err));
    };

    return (
        <nav className="fixed top-0 z-50 flex h-28 w-full items-center justify-between bg-tertiary px-[30px]">
            <Link href="/">
                <Image src="/svgs/logo.svg" alt="logo" width={87} height={87} />
            </Link>
            <div className="flex gap-10 text-white">
                {accountType === 'ADMIN' && (
                    <>
                        <Link
                            href="/client-form"
                            className={`transition-colors ${
                                pathname === '/client-form'
                                    ? 'text-primary'
                                    : ''
                            }`}
                        >
                            Form
                        </Link>
                        <Link
                            href="/client-dashboard"
                            className={`transition-colors ${
                                pathname === '/client-dashboard'
                                    ? 'text-primary'
                                    : ''
                            }`}
                        >
                            Client Dashboard
                        </Link>
                        <Link
                            href="/reports"
                            className={`transition-colors ${
                                pathname === '/reports' ? 'text-primary' : ''
                            }`}
                        >
                            Reports
                        </Link>
                    </>
                )}
                {accountType === 'VOLUNTEER' && (
                    <Link
                        href="/delivery-form"
                        className={`transition-colors ${
                            pathname === '/delivery-form' ? 'text-primary' : ''
                        }`}
                    ></Link>
                )}
                {accountType === 'VOLUNTEER' && (
                    <Link
                        href="/delivery-form"
                        className={`transition-colors ${
                            pathname === '/delivery-form' ? 'text-primary' : ''
                        }`}
                    />
                )}
            </div>
            <div>
                {accountType ? (
                    <button
                        onClick={logout}
                        className={`text-2xl transition-colors ${
                            pathname === '/login'
                                ? 'text-primary'
                                : 'text-white'
                        }`}
                    >
                        LOG OUT
                    </button>
                ) : (
                    <Link
                        href="/auth/login"
                        className={`text-2xl transition-colors ${
                            pathname === '/login'
                                ? 'text-primary'
                                : 'text-white'
                        }`}
                    >
                        SIGN IN
                    </Link>
                )}
            </div>
        </nav>
    );
};
