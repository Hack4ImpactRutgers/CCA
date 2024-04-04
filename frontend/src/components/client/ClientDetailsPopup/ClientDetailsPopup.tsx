'use client';
import { FC, useState } from 'react';
import { LoginButton } from '@/components/auth/LoginButton';
import { Client, Pet } from '@/types/backend';
import { Button } from '@/components/core/Button';
import { DetailsTabContent } from '@/components/client/ClientDetailsPopup/components/DetailsTabContent';
import { PetTabContent } from '@/components/client/ClientDetailsPopup/components/PetTabContent';

interface ClientDetailsPopupProps {
    isEditing?: boolean;
    client: Client;
    onSubmit: (updatedClient: Client) => void;
    onClose: () => void;
}

export const ClientDetailsPopup: FC<ClientDetailsPopupProps> = ({
    isEditing = false,
    client,
}) => {
    const [currentTab, setCurrentTab] = useState(1);

    return (
        <div className="fixed inset-0 z-[100] flex h-screen items-center justify-center bg-black bg-opacity-80">
            <div className="relative">
                <div className="absolute bottom-2 right-2">
                    <Button text="Confirm" />
                </div>
                <div className="h-[500px] w-[850px] overflow-scroll rounded-md bg-white px-10 py-2">
                    <LoginButton
                        text="Details"
                        onClick={() => setCurrentTab(1)}
                        active={currentTab === 1}
                    />
                    {client.pets.map((pet, i) => (
                        <LoginButton
                            key={pet.id}
                            text={`Pet ${i + 2}`}
                            onClick={() => setCurrentTab(i + 2)}
                            active={currentTab === i + 2}
                        />
                    ))}
                    <div className="mb-5 h-[2px] bg-black" />
                    <div className="rounded-md border-2 border-secondary p-5">
                        {currentTab === 1 && (
                            <DetailsTabContent
                                data={client}
                                isEditing={isEditing}
                            />
                        )}
                        {client.pets.map(
                            (pet, i) =>
                                currentTab === i + 2 && (
                                    <PetTabContent
                                        key={client.pets[i].id}
                                        isEditing={isEditing}
                                        data={client.pets[i]}
                                    />
                                )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
