import React, { Dispatch, SetStateAction } from 'react';
import { Button } from '../../components/core/Button';
import Checkbox from '../../components/core/Checkbox';

interface InformationProps {
    litter: boolean;
    supplies: boolean;
    petMedication: boolean;
    vetServices: boolean;
    petTransport: boolean;
    petWalking: boolean;
    boarding: boolean;
    other: boolean;
    setLitter: Dispatch<SetStateAction<boolean>>;
    setSupplies: Dispatch<SetStateAction<boolean>>;
    setPetMedication: Dispatch<SetStateAction<boolean>>;
    setVetServices: Dispatch<SetStateAction<boolean>>;
    setPetTransport: Dispatch<SetStateAction<boolean>>;
    setPetWalking: Dispatch<SetStateAction<boolean>>;
    setBoarding: Dispatch<SetStateAction<boolean>>;
    setOther: Dispatch<SetStateAction<boolean>>;
    setFormPage: Dispatch<SetStateAction<string>>;
}

function Information(props: InformationProps) {
    const handleLitterChange = () => {
        props.setLitter(!props.litter);
    };

    const handleSupplyChange = () => {
        props.setSupplies(!props.supplies);
    };

    const handlePetMedicationChange = () => {
        props.setPetMedication(!props.petMedication);
    };

    const handleVetServicesChange = () => {
        props.setVetServices(!props.vetServices);
    };

    const handlePetTransportChange = () => {
        props.setPetTransport(!props.petTransport);
    };

    const handlePetWalkingChange = () => {
        props.setPetWalking(!props.petWalking);
    };

    const handleBoardingChange = () => {
        props.setBoarding(!props.boarding);
    };

    const handleOtherChange = () => {
        props.setOther(!props.other);
    };

    return (
        <form className="flex flex-col">
            <div className="text-lg">Pet Needs</div>
            Which of the following do you need help with?
            <div className="flex flex-row">
                <Checkbox
                    checked={props.litter}
                    handleChange={handleLitterChange}
                />
                <div className="ml-3">Pet litter/pads</div>
            </div>
            <div className="flex flex-row">
                <Checkbox
                    checked={props.supplies}
                    handleChange={handleSupplyChange}
                />
                <div className="ml-3">
                    Pet supplies (bowls, leash, collar, scratching posts, etc.)
                </div>
            </div>
            <div className="flex flex-row">
                <Checkbox
                    checked={props.petMedication}
                    handleChange={handlePetMedicationChange}
                />
                <div className="ml-3">Pet medication</div>
            </div>
            <div className="flex flex-row">
                <Checkbox
                    checked={props.vetServices}
                    handleChange={handleVetServicesChange}
                />
                <div className="ml-3">Veterinary services</div>
            </div>
            <div className="flex flex-row">
                <Checkbox
                    checked={props.petTransport}
                    handleChange={handlePetTransportChange}
                />
                <div className="ml-3">Pet transportation for vet visits</div>
            </div>
            <div className="flex flex-row">
                <Checkbox
                    checked={props.petWalking}
                    handleChange={handlePetWalkingChange}
                />
                <div className="ml-3">Pet walking</div>
            </div>
            <div className="flex flex-row">
                <Checkbox
                    checked={props.boarding}
                    handleChange={handleBoardingChange}
                />
                <div className="ml-3">
                    Boarding/fostering while in the hospital
                </div>
            </div>
            <div className="flex flex-row">
                <Checkbox
                    checked={props.other}
                    handleChange={handleOtherChange}
                />
                <div className="ml-3">Other</div>
            </div>
            <div
                onClick={() => props.setFormPage('Pet1')}
                className="mt-5 text-right"
            >
                <Button text="Continue" />
            </div>
        </form>
    );
}

export default Information;
