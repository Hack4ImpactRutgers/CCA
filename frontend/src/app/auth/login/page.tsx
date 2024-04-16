'use client';
import { FC, FormEventHandler, useEffect, useState } from 'react';
import Image from 'next/image';
import { TextInput } from '@/components/core/TextInput';
import { LoginButton } from '@/components/auth/LoginButton';
import { Button } from '@/components/core/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUserContext } from '@/context/userContext';
import { CodeInput } from '@/components/auth/CodeInput';

interface PageProps {}

const OTP_CODE_LENGTH = 6;

const Page: FC<PageProps> = () => {
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [loginType, setLoginType] = useState<'ADMIN' | 'VOLUNTEER'>('ADMIN');
    const [sentOTP, setSentOTP] = useState(false);
    const [code, setCode] = useState<string[]>(Array(OTP_CODE_LENGTH).fill(''));
    const { setAccountType, setAccessToken } = useUserContext();
    const router = useRouter();

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        if (loginType === 'ADMIN') {
            fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/admin/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: emailInput,
                    password: passwordInput,
                }),
                credentials: 'include',
            })
                .then((res) => {
                    if (res.ok) {
                        setAccountType('ADMIN');
                        res.json().then((body) => setAccessToken(body.token));
                        router.push('/');
                    }
                })
                .catch((err) => console.error(err));
        } else if (loginType === 'VOLUNTEER' && !sentOTP) {
            fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/otp/request-otp`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: emailInput }),
                }
            )
                .then((res) => {
                    if (res.ok) {
                        setSentOTP(true);
                    }
                })
                .catch((err) => console.error(err));
        } else {
            fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/volunteer/login`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: emailInput,
                        otp: code.join(''),
                    }),
                }
            ).then((res) => {
                if (res.ok) {
                    setAccountType('VOLUNTEER');
                    res.json().then((body) => setAccessToken(body.token));
                    router.push('/');
                }
            });
        }
    };

    return (
        <main>
            <form
                className="mt-52 flex flex-col items-center gap-6"
                onSubmit={handleSubmit}
            >
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
                {!(loginType === 'VOLUNTEER' && sentOTP) && (
                    <TextInput
                        value={emailInput}
                        onChange={setEmailInput}
                        placeholder={'Email'}
                        required
                    />
                )}
                {loginType === 'ADMIN' && (
                    <TextInput
                        value={passwordInput}
                        onChange={setPasswordInput}
                        placeholder={'Password'}
                        type="password"
                        required
                    />
                )}
                {loginType === 'VOLUNTEER' && sentOTP && (
                    <div className="flex flex-col gap-5">
                        <p>Enter the code sent to your email</p>
                        <CodeInput
                            code={code}
                            setCode={setCode}
                            codeLength={OTP_CODE_LENGTH}
                        />
                    </div>
                )}
                <div className="flex flex-col items-center gap-2">
                    {loginType === 'ADMIN' && (
                        <Link
                            className="text-sm text-[#017BAF] hover:underline"
                            href="/auth/admin/forgot-password"
                        >
                            Forgot Password?
                        </Link>
                    )}
                </div>
                <Button
                    type="submit"
                    text={
                        loginType === 'ADMIN' ||
                        (loginType === 'VOLUNTEER' && sentOTP)
                            ? 'LOGIN'
                            : 'Send OTP'
                    }
                />
            </form>
        </main>
    );
};

export default Page;
