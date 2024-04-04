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
    const [registrationType, setRegistrationType] = useState<
        'ADMIN' | 'VOLUNTEER'
    >('ADMIN');
    const [sentOTP, setSentOTP] = useState(false);
    const [code, setCode] = useState<string[]>(Array(OTP_CODE_LENGTH).fill(''));
    const { setAccountType } = useUserContext();
    const router = useRouter();

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        // if (loginType === 'ADMIN') {
        //     fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/admin/login`, {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({
        //             email: emailInput,
        //             password: passwordInput,
        //         }),
        //     })
        //         .then((res) => {
        //             if (res.ok) {
        //                 setAccountType('ADMIN');
        //                 router.push('/');
        //             }
        //         })
        //         .catch((err) => console.error(err));
        // } else if (loginType === 'VOLUNTEER' && !sentOTP) {
        //     fetch(
        //         `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/otp/request-otp`,
        //         {
        //             method: 'POST',
        //             headers: {
        //                 'Content-Type': 'application/json',
        //             },
        //             body: JSON.stringify({ email: emailInput }),
        //         }
        //     )
        //         .then((res) => {
        //             if (res.ok) {
        //                 setSentOTP(true);
        //             }
        //         })
        //         .catch((err) => console.error(err));
        // } else {
        //     fetch(
        //         `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/volunteer/login`,
        //         {
        //             method: 'POST',
        //             headers: {
        //                 'Content-Type': 'application/json',
        //             },
        //             body: JSON.stringify({
        //                 email: emailInput,
        //                 otp: code.join(''),
        //             }),
        //         }
        //     ).then((res) => {
        //         if (res.ok) {
        //             setAccountType('VOLUNTEER');
        //             router.push('/');
        //         }
        //     });
        // }
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
                        onClick={() => setRegistrationType('ADMIN')}
                        active={registrationType === 'ADMIN'}
                    />
                    <LoginButton
                        text="Volunteer"
                        onClick={() => setRegistrationType('VOLUNTEER')}
                        active={registrationType === 'VOLUNTEER'}
                    />
                </div>
                <Image
                    src="/images/logo.png"
                    alt="logo"
                    width={239}
                    height={239}
                />
                <span className="text-3xl font-bold text-tertiary">
                    Account Registration
                </span>
                {!(registrationType === 'VOLUNTEER' && sentOTP) && (
                    <TextInput
                        value={emailInput}
                        onChange={setEmailInput}
                        placeholder={'Email'}
                        required
                    />
                )}
                {registrationType === 'ADMIN' && (
                    <TextInput
                        value={passwordInput}
                        onChange={setPasswordInput}
                        placeholder={'Password'}
                        type="password"
                        required
                    />
                )}
                {registrationType === 'VOLUNTEER' && sentOTP && (
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
                    <button
                        className="text-sm text-[#017BAF] hover:underline"
                        onClick={() => router.push('login')}
                    >
                        Already have an account? Login
                    </button>
                </div>
                <Button
                    type="submit"
                    text={
                        registrationType === 'ADMIN' ||
                        (registrationType === 'VOLUNTEER' && sentOTP)
                            ? 'REGISTER'
                            : 'Send OTP'
                    }
                />
            </form>
        </main>
    );
};

export default Page;
