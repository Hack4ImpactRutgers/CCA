'use client';
import { FC, FormEventHandler, useState } from 'react';
import Image from 'next/image';
import { TextInput } from '@/components/core/TextInput';
import { LoginButton } from '@/components/auth/LoginButton';
import { Button } from '@/components/core/Button';
import Link from 'next/link';

interface PageProps {}

const Page: FC<PageProps> = () => {
    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
    const [loginType, setLoginType] = useState<'ADMIN' | 'VOLUNTEER'>('ADMIN');
    const [formType, setFormType] = useState<'LOGIN' | 'REGISTER'>('LOGIN');

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        if (formType === 'REGISTER' && passwordInput != confirmPasswordInput) {
            // Passwords don't match.
            return;
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
                <TextInput
                    value={usernameInput}
                    onChange={setUsernameInput}
                    placeholder={'Username'}
                    required
                />
                <TextInput
                    value={passwordInput}
                    onChange={setPasswordInput}
                    placeholder={'Password'}
                    type="password"
                    required
                />
                {formType === 'REGISTER' && (
                    <TextInput
                        value={confirmPasswordInput}
                        onChange={setConfirmPasswordInput}
                        placeholder={'Confirm password'}
                        type="password"
                        required
                    />
                )}
                <div className="flex flex-col items-center gap-2">
                    {formType === 'LOGIN' && (
                        <Link
                            className="text-sm text-[#017BAF] hover:underline"
                            href="/"
                        >
                            Forgot Username or Password?
                        </Link>
                    )}
                    <button
                        className="text-sm text-[#017BAF] hover:underline"
                        onClick={() =>
                            setFormType(
                                formType === 'LOGIN' ? 'REGISTER' : 'LOGIN'
                            )
                        }
                    >
                        {formType === 'LOGIN'
                            ? "Don't have an account? Register"
                            : 'Already have an account? Login'}
                    </button>
                </div>
                <Button
                    type="submit"
                    text={formType === 'LOGIN' ? 'Login' : 'Register'}
                    onClick={() => {}}
                />
            </form>
        </main>
    );
};

export default Page;
