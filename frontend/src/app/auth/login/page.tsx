'use client';
import { FC, FormEventHandler, useEffect, useState } from 'react';
import Image from 'next/image';
import { TextInput } from '@/components/core/TextInput';
import { LoginButton } from '@/components/auth/LoginButton';
import { Button } from '@/components/core/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAdminLogin, useAdminSignUp, useRequestOTP } from '@/hooks/auth';

interface PageProps {}

const Page: FC<PageProps> = () => {
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [loginType, setLoginType] = useState<'ADMIN' | 'VOLUNTEER'>('ADMIN');
    const router = useRouter();

    const { adminLogin, adminLoginSuccess, adminLoginError } = useAdminLogin();
    const { requestOTP, requestOTPSuccess, requestOTPError } = useRequestOTP();

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        if (loginType === 'VOLUNTEER') {
            if (emailInput) {
                requestOTP({ email: emailInput });
            }
            return;
        }

        if (!emailInput || !passwordInput) {
            return;
        }

        adminLogin({ email: emailInput, password: passwordInput });
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
                <TextInput
                    value={emailInput}
                    onChange={setEmailInput}
                    placeholder={'Email'}
                    required
                />
                {loginType === 'ADMIN' && (
                    <TextInput
                        value={passwordInput}
                        onChange={setPasswordInput}
                        placeholder={'Password'}
                        type="password"
                        required
                    />
                )}
                <div className="flex flex-col items-center gap-2">
                    {loginType === 'ADMIN' && (
                        <Link
                            className="text-sm text-[#017BAF] hover:underline"
                            href="/"
                        >
                            Forgot Username or Password?
                        </Link>
                    )}
                    <button
                        className="text-sm text-[#017BAF] hover:underline"
                        onClick={() => router.push('register')}
                    >
                        Don&apos;t have an account? Register
                    </button>
                </div>
                <Button
                    type="submit"
                    text={loginType === 'ADMIN' ? 'LOGIN' : 'Send OTP'}
                />
            </form>
        </main>
    );
};

export default Page;
