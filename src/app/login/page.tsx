'use client';
import { FC, useState } from 'react';
import Image from 'next/image';
import { TextInput } from '@/components/core/TextInput';
import { LoginButton } from '@/components/auth/LoginButton';
import { Button } from '@/components/core/Button';
import Link from 'next/link';

interface PageProps {}

const Page: FC<PageProps> = () => {
    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [loginType, setLoginType] = useState<'ADMIN' | 'VOLUNTEER'>('ADMIN');

    return (
        <main>
            <div className="mt-52 flex flex-col items-center gap-6">
                <div>
                    <LoginButton
                        text="Admin"
                        onClick={() => setLoginType('ADMIN')}
                        active={loginType === 'ADMIN'}
                    />
                    <LoginButton
                        text="Volunteer"
                        onClick={() => setLoginType('VOLUNTEER')}
                        active={loginType === 'VOLUNTEER'}
                    />
                </div>
                <Image
                    src="/images/logo.png"
                    alt="logo"
                    width={239}
                    height={239}
                />
                <span className="text-3xl font-bold text-tertiary">
                    Account Login
                </span>
                <TextInput
                    value={usernameInput}
                    onChange={setUsernameInput}
                    placeholder={'Username'}
                />
                <TextInput
                    value={passwordInput}
                    onChange={setPasswordInput}
                    placeholder={'Password'}
                />
                <div className="flex flex-col gap-2">
                    <Link
                        className="text-sm text-[#017BAF] hover:underline"
                        href="/"
                    >
                        Forgot Username or Password
                    </Link>
                    <Button text={'Log In'} onClick={() => {}} />
                </div>
            </div>
        </main>
    );
};

export default Page;
