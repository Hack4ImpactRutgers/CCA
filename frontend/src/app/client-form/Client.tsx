'use client';

import { useUserContext } from '@/context/userContext';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Button } from '@/components/core/Button';
import { TextInput } from '@/components/core/TextInput';

interface ClientProps {
    first: string;
    last: string;
    site: string;
    address: string;
    city: string;
    zip: string;
    phone: string;
    secondFirst: string;
    secondLast: string;
    secondPhone: string;
    setFirst: Dispatch<SetStateAction<string>>;
    setLast: Dispatch<SetStateAction<string>>;
    setSite: Dispatch<SetStateAction<string>>;
    setAddress: Dispatch<SetStateAction<string>>;
    setCity: Dispatch<SetStateAction<string>>;
    setZip: Dispatch<SetStateAction<string>>;
    setPhone: Dispatch<SetStateAction<string>>;
    setFormPage: Dispatch<SetStateAction<string>>;
    setSecondFirst: Dispatch<SetStateAction<string>>;
    setSecondLast: Dispatch<SetStateAction<string>>;
    setSecondPhone: Dispatch<SetStateAction<string>>;
}

function Client(props: ClientProps) {
    const [isError, setIsError] = useState(false);
    const [siteLocations, setSiteLocations] = useState<any[]>([]);

    const { accessToken } = useUserContext();

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/site/all`, {
            credentials: 'include',
            headers: {
                'cca-auth-token': accessToken,
            },
        })
            .then((res) => res.json())
            .then((sites) => {
                setSiteLocations(sites);
                props.setSite(sites[0].location);
            });
    }, [accessToken, props]);

    return (
        <form className="">
            <div className='after:ml-0.5 after:text-[red] after:content-["*"]'>
                Name
            </div>

            <div className="flex flex-row">
                <TextInput
                    value={props.first || ''}
                    placeholder={'First Name'}
                    onChange={props.setFirst}
                    required
                />

                <div className="ml-5">
                    <TextInput
                        value={props.last || ''}
                        placeholder={'Last Name'}
                        onChange={props.setLast}
                    />
                </div>
            </div>

            <div className='mt-5 after:ml-0.5 after:text-[red] after:content-["*"]'>
                Delivery Site Location
            </div>
            <select
                onChange={(e) => props.setSite(e.target.value)}
                className="w-[395px]"
            >
                {siteLocations.map((location) => {
                    return (
                        <option key={location._id} value={location._id}>
                            {location.location}
                        </option>
                    );
                })}
            </select>

            <div className='mt-5 after:ml-0.5 after:text-[red] after:content-["*"]'>
                Street Address
            </div>
            <TextInput
                value={props.address || ''}
                placeholder={''}
                onChange={props.setAddress}
                required
            />

            <div className="flex">
                <div>
                    <div className='mt-5 after:ml-0.5 after:text-[red] after:content-["*"]'>
                        City
                    </div>
                    <TextInput
                        value={props.city || ''}
                        placeholder={''}
                        onChange={props.setCity}
                        required
                    />
                </div>

                <div className="ml-5">
                    <div className='mt-5 after:ml-0.5 after:text-[red] after:content-["*"]'>
                        Zip Code
                    </div>
                    <TextInput
                        value={props.zip || ''}
                        placeholder={''}
                        onChange={props.setZip}
                        required
                        type="number"
                    />
                </div>
            </div>

            <div className='mt-5 after:ml-0.5 after:text-[red] after:content-["*"]'>
                Phone Number
            </div>
            <TextInput
                value={props.phone || ''}
                placeholder={''}
                onChange={props.setPhone}
                required
                type="number"
            />

            <div className="flex">
                <div>
                    <div className="mt-5">Secondary Contact</div>
                    <div className="flex flex-row">
                        <TextInput
                            value={props.secondFirst || ''}
                            placeholder={'First Name'}
                            onChange={props.setSecondFirst}
                        />
                        <div className="ml-5">
                            <TextInput
                                value={props.secondLast || ''}
                                placeholder={'Last Name'}
                                onChange={props.setSecondLast}
                            />
                        </div>
                    </div>
                    <div className="mt-2">
                        <TextInput
                            value={props.secondPhone || ''}
                            placeholder={'Phone Number'}
                            onChange={props.setSecondPhone}
                        />
                    </div>
                </div>
            </div>
            <div
                onClick={() => {
                    if (
                        props.first === '' ||
                        props.site === '' ||
                        props.address === '' ||
                        props.city === '' ||
                        props.zip === '' ||
                        props.phone === ''
                    ) {
                        setIsError(true);
                        return;
                    }

                    props.setFormPage('Information');
                }}
                className="mt-5 text-right"
            >
                <Button text="Continue" />
            </div>
            {isError && (
                <div className="text-red-500">
                    Please fill out all required fields.
                </div>
            )}
        </form>
    );
}

export default Client;
