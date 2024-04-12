import { Client } from '@/types/backend';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import { Input } from '@/components/client-dashboard/ClientDetailsPopup/components/Input';
import { deepClone } from '@/util/objects';

interface DetailsTabContentProps {
    data: Omit<Client, 'pets'>;
    isEditing?: boolean;
    onChange: Dispatch<SetStateAction<Client>>;
}

export const DetailsTabContent: FC<DetailsTabContentProps> = ({
    data,
    isEditing = false,
    onChange,
}) => {
    const [streetAddressInput, setStreetAddressInput] = useState('');
    const [stateInput, setStateInput] = useState('');
    const [zipCodeInput, setZipCodeInput] = useState(0);
    const [cityInput, setCityInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [phoneNumberInput, setPhoneNumberInput] = useState(0);

    return (
        <>
            <div className="mb-[50px]">
                <p className="font-bold">Name</p>
                <p>{data.name}</p>
            </div>
            <div className="flex flex-wrap gap-x-[150px] gap-y-[50px]">
                <div>
                    <p className="font-bold">Street Address</p>
                    {isEditing ? (
                        <Input
                            value={streetAddressInput}
                            onChange={(e) => {
                                onChange((prev) => {
                                    const copy = deepClone(prev);
                                    copy.street = e.target.value;
                                    return copy;
                                });
                            }}
                        />
                    ) : (
                        <p>{data.street}</p>
                    )}
                </div>
                <div>
                    <p className="font-bold">State</p>
                    {isEditing ? (
                        <Input
                            value={stateInput}
                            onChange={(e) => {
                                onChange((prev) => {
                                    const copy = deepClone(prev);
                                    copy.state = e.target.value;
                                    return copy;
                                });
                            }}
                        />
                    ) : (
                        <p>{data.state}</p>
                    )}
                </div>
                <div>
                    <p className="font-bold">Zip Code</p>
                    {isEditing ? (
                        <Input
                            type="number"
                            value={zipCodeInput}
                            onChange={(e) => {
                                onChange((prev) => {
                                    const copy = deepClone(prev);
                                    copy.zipCode = e.target.value;
                                    return copy;
                                });
                            }}
                        />
                    ) : (
                        <p>{data.zipCode}</p>
                    )}
                </div>
                <div>
                    <p className="font-bold">City</p>
                    {isEditing ? (
                        <Input
                            value={cityInput}
                            onChange={(e) => {
                                onChange((prev) => {
                                    const copy = deepClone(prev);
                                    copy.city = e.target.value;
                                    return copy;
                                });
                            }}
                        />
                    ) : (
                        <p>{data.city}</p>
                    )}
                </div>
                <div>
                    <p className="font-bold">Email Address</p>
                    {isEditing ? (
                        <Input
                            type="email"
                            value={emailInput}
                            onChange={(e) => {
                                onChange((prev) => {
                                    const copy = deepClone(prev);
                                    copy.email = e.target.value;
                                    return copy;
                                });
                            }}
                        />
                    ) : (
                        <p>{data.email}</p>
                    )}
                </div>
            </div>
            <div className="mt-[50px]">
                <p className="font-bold">Phone Number</p>
                {isEditing ? (
                    <Input
                        type="number"
                        value={phoneNumberInput}
                        onChange={(e) => {
                            onChange((prev) => {
                                const copy = deepClone(prev);
                                copy.phone = e.target.value;
                                return copy;
                            });
                        }}
                    />
                ) : (
                    <p>{data.phone}</p>
                )}
            </div>
        </>
    );
};
