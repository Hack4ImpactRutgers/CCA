import React, { Dispatch, SetStateAction, useState } from 'react';
import { Button } from '../../components/core/Button';
import RadioButton from '../../components/core/RadioButton';
import { TextInput } from '../../components/core/TextInput';

interface PetProps {
    petName: string;
    petType: string;
    breed: string;
    age: string;
    weight: string;
    color: string;
    howLong: string;
    spendTime: string;
    eats: string;
    medications: string;
    health: string;
    extra: string;
    sprayed: boolean;
    vaccinated: boolean;
    heartworm: boolean;
    flea: boolean;
    take: boolean;

    setPetName: Dispatch<SetStateAction<string>>;
    setPetType: Dispatch<SetStateAction<string>>;
    setBreed: Dispatch<SetStateAction<string>>;
    setAge: Dispatch<SetStateAction<string>>;
    setWeight: Dispatch<SetStateAction<string>>;
    setColor: Dispatch<SetStateAction<string>>;
    setHowLong: Dispatch<SetStateAction<string>>;
    setSpendTime: Dispatch<SetStateAction<string>>;
    setEats: Dispatch<SetStateAction<string>>;
    setMedications: Dispatch<SetStateAction<string>>;
    setHealth: Dispatch<SetStateAction<string>>;
    setExtra: Dispatch<SetStateAction<string>>;
    setSprayed: Dispatch<SetStateAction<boolean>>;
    setVaccinated: Dispatch<SetStateAction<boolean>>;
    setHeartworm: Dispatch<SetStateAction<boolean>>;
    setFlea: Dispatch<SetStateAction<boolean>>;
    setTake: Dispatch<SetStateAction<boolean>>;
    setFormPage: Dispatch<SetStateAction<string>>;

    num: number;
}

function Pet(props: PetProps) {
    const [isError, setIsError] = useState(false);

    return (
        <form className="">
            <div className='mt-5 after:ml-0.5 after:text-[red] after:content-["*"]'>
                Pet Name
            </div>
            <TextInput
                value={props.petName || ''}
                placeholder={''}
                onChange={props.setPetName}
                required
            />

            <div className='mt-5 after:ml-0.5 after:text-[red] after:content-["*"]'>
                Type of Pet
            </div>
            <TextInput
                value={props.petType || ''}
                placeholder={''}
                onChange={props.setPetType}
                required
            />

            <div className='mt-5 after:ml-0.5 after:text-[red] after:content-["*"]'>
                Breed
            </div>
            <TextInput
                value={props.breed || ''}
                placeholder={''}
                onChange={props.setBreed}
                required
            />

            <div className='mt-5 after:ml-0.5 after:text-[red] after:content-["*"]'>
                Age
            </div>
            <TextInput
                value={props.age || ''}
                placeholder={''}
                onChange={props.setAge}
                required
                type="number"
            />

            <div className='mt-5 after:ml-0.5 after:text-[red] after:content-["*"]'>
                Weight
            </div>
            <TextInput
                value={props.weight || ''}
                placeholder={''}
                onChange={props.setWeight}
                required
                type="number"
            />

            <div className='mt-5 after:ml-0.5 after:text-[red] after:content-["*"]'>
                Color/Description
            </div>
            <TextInput
                value={props.color || ''}
                placeholder={''}
                onChange={props.setColor}
                required
            />

            <div className='mt-5 after:ml-0.5 after:text-[red] after:content-["*"]'>
                How long have you had this pet?
            </div>
            <TextInput
                value={props.howLong || ''}
                placeholder={''}
                onChange={props.setHowLong}
                required
            />

            <div className='mt-5 after:ml-0.5 after:text-[red] after:content-["*"]'>
                Where does this pet spend most of its time?
            </div>
            <TextInput
                value={props.spendTime || ''}
                placeholder={''}
                onChange={props.setSpendTime}
                required
            />

            <div className='mt-5 after:ml-0.5 after:text-[red] after:content-["*"]'>
                What does this pet eat? (examples: dry food, can food, table
                scraps)
            </div>
            <TextInput
                value={props.eats || ''}
                placeholder={''}
                onChange={props.setEats}
                required
            />

            <div className='after:ml-0.5 after:text-[red] after:content-["*"]'>
                Has this pet been sprayed/neutered?
            </div>
            <div className="flex">
                <RadioButton
                    truth={true}
                    check={props.sprayed}
                    change={props.setSprayed}
                />
                <label className="ml-3">Yes</label>
                <div className="ml-10">
                    <RadioButton
                        truth={false}
                        check={!props.sprayed}
                        change={props.setSprayed}
                    />
                </div>
                <label className="ml-3">No</label>
            </div>

            <div className='after:ml-0.5 after:text-[red] after:content-["*"]'>
                Does this pet need vaccinations?
            </div>
            <div className="flex">
                <RadioButton
                    truth={true}
                    check={props.vaccinated}
                    change={props.setVaccinated}
                />
                <label className="ml-3">Yes</label>
                <div className="ml-10">
                    <RadioButton
                        truth={false}
                        check={!props.vaccinated}
                        change={props.setVaccinated}
                    />
                </div>
                <label className="ml-3">No</label>
            </div>

            <div className='after:ml-0.5 after:text-[red] after:content-["*"]'>
                Is this pet on monthly heartworm preventative?
            </div>
            <div className="flex">
                <RadioButton
                    truth={true}
                    check={props.heartworm}
                    change={props.setHeartworm}
                />
                <label className="ml-3">Yes</label>
                <div className="ml-10">
                    <RadioButton
                        truth={false}
                        check={!props.heartworm}
                        change={props.setHeartworm}
                    />
                </div>
                <label className="ml-3">No</label>
            </div>

            <div className='after:ml-0.5 after:text-[red] after:content-["*"]'>
                Is this pet on monthly flea preventative?
            </div>
            <div className="flex">
                <RadioButton
                    truth={true}
                    check={props.flea}
                    change={props.setFlea}
                />
                <label className="ml-3">Yes</label>
                <div className="ml-10">
                    <RadioButton
                        truth={false}
                        check={!props.flea}
                        change={props.setFlea}
                    />
                </div>
                <label className="ml-3">No</label>
            </div>

            <div className='after:ml-0.5 after:text-[red] after:content-["*"]'>
                Does this pet take any medications?
            </div>
            <div className="flex">
                <RadioButton
                    truth={true}
                    check={props.take}
                    change={props.setTake}
                />
                <label className="ml-3">Yes</label>
                <div className="ml-10">
                    <RadioButton
                        truth={false}
                        check={!props.take}
                        change={props.setTake}
                    />
                </div>
                <label className="ml-3">No</label>
            </div>

            <div className="mt-5">If yes, please list medications</div>
            <TextInput
                value={props.medications || ''}
                placeholder={''}
                onChange={props.setMedications}
            />

            <div className='mt-5 after:ml-0.5 after:text-[red] after:content-["*"]'>
                To your knowledge, is your pet in good health today?
            </div>
            <TextInput
                value={props.health || ''}
                placeholder={''}
                onChange={props.setHealth}
                required
            />

            <div className='mt-5 after:ml-0.5 after:text-[red] after:content-["*"]'>
                Is there anything else you would like us to know about your pet?
            </div>
            <TextInput
                value={props.extra || ''}
                placeholder={''}
                onChange={props.setExtra}
                required
            />
            <div className="flex flex-row">
                {
                    <div
                        onClick={() => {
                            if (
                                props.petName === '' ||
                                props.petType === '' ||
                                props.breed === '' ||
                                props.age === '' ||
                                props.weight === '' ||
                                props.color === '' ||
                                props.howLong === '' ||
                                props.spendTime === '' ||
                                props.eats === '' ||
                                props.health === '' ||
                                props.extra === ''
                            ) {
                                setIsError(true);
                                return;
                            }

                            props.setFormPage('Confirm');
                        }}
                        className="mt-5 text-right"
                    >
                        <Button text="Submit" />
                    </div>
                }

                {props.num == 1 && (
                    <div
                        onClick={() => {
                            if (
                                props.petName === '' ||
                                props.petType === '' ||
                                props.breed === '' ||
                                props.age === '' ||
                                props.weight === '' ||
                                props.color === '' ||
                                props.howLong === '' ||
                                props.spendTime === '' ||
                                props.eats === '' ||
                                props.health === '' ||
                                props.extra === ''
                            ) {
                                setIsError(true);
                                return;
                            }

                            props.setFormPage('Pet2');
                        }}
                        className="ml-5 mt-5 text-right"
                    >
                        <Button text="Add Pet" />
                    </div>
                )}

                {props.num == 2 && (
                    <div
                        onClick={() => {
                            if (
                                props.petName === '' ||
                                props.petType === '' ||
                                props.breed === '' ||
                                props.age === '' ||
                                props.weight === '' ||
                                props.color === '' ||
                                props.howLong === '' ||
                                props.spendTime === '' ||
                                props.eats === '' ||
                                props.health === '' ||
                                props.extra === ''
                            ) {
                                setIsError(true);
                                return;
                            }

                            props.setFormPage('Pet3');
                        }}
                        className="ml-5 mt-5 text-right"
                    >
                        <Button text="Add Pet " />
                    </div>
                )}
            </div>
            {isError && (
                <div className="text-red-500">
                    Please fill out all required fields.
                </div>
            )}
        </form>
    );
}

export default Pet;
