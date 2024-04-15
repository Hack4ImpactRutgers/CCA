'use client';

import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Button } from '../../components/core/Button';
import { TextInput } from '../../components/core/TextInput';

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
                Delivery Site Location
            </div>
            <TextInput
                value={props.site || ''}
                placeholder={''}
                onChange={props.setSite}
            />

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
                onClick={() => props.setFormPage('Information')}
                className="mt-5 text-right"
            >
                <Button text="Continue" />
            </div>
        </form>
    );
}

export default Client;