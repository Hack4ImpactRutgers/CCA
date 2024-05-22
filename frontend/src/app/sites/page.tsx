'use client';
import { useState } from 'react';
import { TextInput } from '@/components/core/TextInput';
import { Button } from '@/components/core/Button';
import { useUserContext } from '@/context/userContext';
import { useRouter } from 'next/navigation';

export default function Page() {
    const [location, setLocation] = useState('');
    const { accessToken } = useUserContext();
    const router = useRouter();

    const onSubmit = () => {
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/site`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'cca-auth-token': accessToken,
            },
            body: JSON.stringify({
                location,
            }),
        }).then((res) => {
            if (res.ok) {
                router.push('/');
            }
        });
    };

    return (
        <div className="flex flex-col items-center gap-5 p-10">
            <div className="flex w-[500px] flex-col items-center gap-5">
                <h1 className="text-2xl font-bold">Add new site</h1>
                <TextInput
                    value={location}
                    onChange={setLocation}
                    placeholder={'Site location'}
                    required
                />
                <Button text={'Submit'} onClick={onSubmit} />
            </div>
        </div>
    );
}
