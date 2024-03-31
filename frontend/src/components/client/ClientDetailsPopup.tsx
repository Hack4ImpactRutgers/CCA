'use client';
import { FC, useState } from 'react';
import { LoginButton } from '@/components/auth/LoginButton';
import { Client, Pet } from '@/types/backend';

interface DetailsPageContentProps {
    data: Omit<Client, 'pets'>;
}

// TODO: remove placeholders in missing fields once backend is updated

const DetailsPageContent: FC<DetailsPageContentProps> = ({ data }) => {
    return (
        <>
            <div>
                <p className="font-bold">Name</p>
                <p>{data.name}</p>
            </div>
            <div className="flex flex-wrap gap-x-[150px]">
                <div>
                    <p className="font-bold">Street Address</p>
                    <p>{data.address}</p>
                </div>
                <div>
                    <p className="font-bold">State</p>
                    <p>NJ</p>
                </div>
                <div>
                    <p className="font-bold">Zip Code</p>
                    <p>00000</p>
                </div>
                <div>
                    <p className="font-bold">City</p>
                    <p>ABCD</p>
                </div>
                <div>
                    <p className="font-bold">Email Address</p>
                    <p>ABCD</p>
                </div>
            </div>
            <div>
                <p className="font-bold">Phone Number</p>
                <p>0000000000</p>
            </div>
        </>
    );
};

interface PetPageContentProps {
    data: Pet;
}

const PetPageContent: FC<PetPageContentProps> = ({ data }) => {
    return (
        <>
            <div>
                <p className="font-bold">Name</p>
                <p>Poppy, {data.animal}</p>
            </div>
            <div className="flex flex-wrap gap-x-[150px]">
                <div>
                    <p className="font-bold">Age</p>
                    <p>5 years old</p>
                </div>
                <div>
                    <p className="font-bold">Weight</p>
                    <p>WEIGHT</p>
                </div>
                <div>
                    <p className="font-bold">Color / Description</p>
                    <p>DESCRIPTION</p>
                </div>
            </div>
            <div>
                <p className="font-bold">Diet</p>
                <p>0000000000</p>
            </div>
            <div>
                <p className="font-bold">Brand of Food</p>
                <p>{data.food.kind}</p>
            </div>
            <div>
                <p className="font-bold">Amount of Food Per Month</p>
                <p>{data.food.lbs}</p>
            </div>
        </>
    );
};

interface ClientDetailsPopupProps {
    isEditing?: boolean;
    client: Client;
}

export const ClientDetailsPopup: FC<ClientDetailsPopupProps> = ({
    isEditing = false,
    client,
}) => {
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <div className="h-[500px] w-[800px] overflow-scroll rounded-md bg-red-50 px-10 py-2">
            <LoginButton
                text="Details"
                onClick={() => setCurrentPage(1)}
                active={currentPage === 1}
            />
            {client.pets.map((pet, i) => (
                <LoginButton
                    key={pet.id}
                    text={`Pet ${i + 2}`}
                    onClick={() => setCurrentPage(i + 2)}
                    active={currentPage === i + 2}
                />
            ))}
            <div className="mb-5 h-[2px] bg-black" />
            <div className="rounded-md border-2 border-secondary p-5">
                {currentPage === 1 && <DetailsPageContent data={client} />}
                {client.pets.map(
                    (pet, i) =>
                        currentPage === i + 2 && (
                            <PetPageContent
                                key={client.pets[i].id}
                                data={client.pets[i]}
                            />
                        )
                )}
            </div>
        </div>
    );
};
