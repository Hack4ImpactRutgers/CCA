import { Client } from '@/types/backend';
import { FC, useState } from 'react';
import { Input } from '@/components/client-dashboard/ClientDetailsPopup/components/Input';

interface DetailsTabContentProps {
    data: Omit<Client, 'pets'>;
    isEditing?: boolean;
}

export const DetailsTabContent: FC<DetailsTabContentProps> = ({
    data,
    isEditing = false,
}) => {
    const [streetAddressInput, setStreetAddressInput] = useState('');
    const [stateInput, setStateInput] = useState('');
    const [zipCodeInput, setZipCodeInput] = useState(0);
    const [emailInput, setEmailInput] = useState(0);
    const [phoneNumberInput, setPhoneNumberInput] = useState('');

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
                            onChange={(e) =>
                                setStreetAddressInput(e.target.value)
                            }
                        />
                    ) : (
                        <p>{data.address}</p>
                    )}
                </div>
                <div>
                    <p className="font-bold">State</p>
                    {isEditing ? <Input /> : <p>NJ</p>}
                </div>
                <div>
                    <p className="font-bold">Zip Code</p>
                    {isEditing ? <Input type="number" /> : <p>00000</p>}
                </div>
                <div>
                    <p className="font-bold">City</p>
                    {isEditing ? <Input /> : <p>ABCD</p>}
                </div>
                <div>
                    <p className="font-bold">Email Address</p>
                    {isEditing ? <Input type="email" /> : <p>ABCD</p>}
                </div>
            </div>
            <div className="mt-[50px]">
                <p className="font-bold">Phone Number</p>
                {isEditing ? <Input type="number" /> : <p>0000000000</p>}
            </div>
        </>
    );
};
