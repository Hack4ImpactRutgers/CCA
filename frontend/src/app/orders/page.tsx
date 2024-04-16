'use client';
import { useEffect, useState } from 'react';
import { TextInput } from '@/components/core/TextInput';
import { Button } from '@/components/core/Button';
import { useUserContext } from '@/context/userContext';
import { useRouter } from 'next/navigation';

export default function Page() {
    const [clients, setClients] = useState<any[]>([]);
    const [clientId, setClientId] = useState('');
    const [brand, setBrand] = useState('');
    const [weight, setWeight] = useState('');
    const { accessToken } = useUserContext();
    const router = useRouter();

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/client/all`, {
            credentials: 'include',
            headers: {
                'cca-auth-token': accessToken,
            },
        })
            .then((res) => res.json())
            .then(setClients);
    }, [accessToken]);

    const onSubmit = () => {
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/orders`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'cca-auth-token': accessToken,
            },
            body: JSON.stringify({
                client: clientId,
                foodItems: { brand, weight: parseInt(weight) },
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
                <h1 className="text-2xl font-bold">Create an order</h1>
                <div className='mt-5 after:ml-0.5 after:text-[red] after:content-["*"]'>
                    Clients
                </div>

                <select
                    onChange={(e) => setClientId(e.target.value)}
                    className="w-[395px]"
                >
                    {clients.map((client) => {
                        return (
                            <option key={client._id} value={client._id}>
                                {client.name}
                            </option>
                        );
                    })}
                </select>
                <TextInput
                    value={brand}
                    onChange={setBrand}
                    placeholder={'Brand'}
                    required
                />
                <TextInput
                    value={weight}
                    onChange={setWeight}
                    placeholder={'weight'}
                    required
                />
                <Button text={'Submit'} onClick={onSubmit} />
            </div>
        </div>
    );
}
