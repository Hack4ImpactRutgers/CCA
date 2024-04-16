'use client';

import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Button } from '../../components/core/Button';
import { TextInput } from '../../components/core/TextInput';
import { useUserContext } from '@/context/userContext';

interface ClientProps {
    first: string;
    last: string;
    address: string;
    city: string;
    zip: string;
    phone: string;
    instructions: string;
    setFirst: Dispatch<SetStateAction<string>>;
    setClientId: Dispatch<SetStateAction<string>>;
    setLast: Dispatch<SetStateAction<string>>;
    setAddress: Dispatch<SetStateAction<string>>;
    setCity: Dispatch<SetStateAction<string>>;
    setZip: Dispatch<SetStateAction<string>>;
    setPhone: Dispatch<SetStateAction<string>>;
    setInstructions: Dispatch<SetStateAction<string>>;
    setFormPage: Dispatch<SetStateAction<string>>;
}

function Client(props: ClientProps) {

    const { accessToken } = useUserContext(); 
    let [clients, setClients] = useState<any[]>([]);
    let [orders, setOrders] = useState<any[]>([]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(()=>{
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/client/all`, {
            headers: {
                'cca-auth-token': accessToken
            }
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            setClients(data);
        })
    },[accessToken]);

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
                Clients
            </div>
            <div className="flex flex-col">
                <select onChange={(event)=>{
                    props.setClientId(event.target.value);

                }} name="" id="">
                    {clients.map((client) => {
                        return (
                            <option key={client._id} value={client._id}>{client.name}</option>
                        );
                    })}
                </select>
            </div>


            <div className='mt-5 after:ml-0.5 after:text-[red] after:content-["*"]'>
                Street Address
            </div>
            <TextInput
                value={props.address || ''}
                placeholder={''}
                onChange={props.setAddress}
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
            />

            <div className="mt-5">Special Delivery Instructions</div>
            <TextInput
                value={props.instructions || ''}
                placeholder={''}
                onChange={props.setInstructions}
            />

            <div
                onClick={() => props.setFormPage('Pet1')}
                className="mt-5 text-right"
            >
                <Button text="Continue" />
            </div>
        </form>
    );
}

export default Client;
