'use client';
import { FC, FormEventHandler, useEffect, useState } from 'react';
import Image from 'next/image';
import { TextInput } from '@/components/core/TextInput';
import { Button } from '@/components/core/Button';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useUserContext } from '@/context/userContext';
import { CodeInput } from '@/components/auth/CodeInput';
import { cookies } from 'next/headers';

interface PageProps {}

const Page: FC<PageProps> = () => {
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
    const router = useRouter();
    const searchParams = useSearchParams();

    const jwt = searchParams.get('jwt');

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        if (!jwt) {
            fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/admin/forgot-password`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: emailInput,
                    }),
                    credentials: 'include',
                }
            ).catch((err) => console.error(err));
        } else {
            fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/admin/verify-forgot-password`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        token: jwt,
                        password: passwordInput,
                    }),
                    credentials: 'include',
                }
            )
                .then((res) => {
                    if (res.ok) {
                        router.push('/auth/login');
                    }
                })
                .catch((err) => console.error(err));
        }
    };

    if (jwt) {
        return (
            <main>
                <form
                    className="mt-52 flex flex-col items-center gap-6"
                    onSubmit={handleSubmit}
                >
                    <Image
                        src="/images/logo.png"
                        alt="logo"
                        width={239}
                        height={239}
                    />
                    <span className="text-3xl font-bold text-tertiary">
                        Forgot Password
                    </span>
                    <TextInput
                        value={passwordInput}
                        onChange={setPasswordInput}
                        placeholder={'New password'}
                        required
                        type="password"
                    />
                    <TextInput
                        value={confirmPasswordInput}
                        onChange={setConfirmPasswordInput}
                        placeholder={'Confirm password'}
                        required
                        type="password"
                    />
                    <Button type="submit" text={'Change Password'} />
                </form>
            </main>
        );
    }

    return (
        <main>
            <form
                className="mt-52 flex flex-col items-center gap-6"
                onSubmit={handleSubmit}
            >
                <Image
                    src="/images/logo.png"
                    alt="logo"
                    width={239}
                    height={239}
                />
                <span className="text-3xl font-bold text-tertiary">
                    Forgot Password
                </span>
                <TextInput
                    value={emailInput}
                    onChange={setEmailInput}
                    placeholder={'Email'}
                    required
                />
                <Button type="submit" text={'Send Email'} />
            </form>
        </main>
    );
};

export default Page;
