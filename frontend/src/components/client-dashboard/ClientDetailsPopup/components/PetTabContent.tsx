import { Client, Pet } from '@/types/backend';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import { Input } from '@/components/client-dashboard/ClientDetailsPopup/components/Input';
import { deepClone } from '@/util/objects';

interface PetTabContentProps {
    data: Pet;
    isEditing?: boolean;
    onChange: Dispatch<SetStateAction<Client>>;
    index: number;
}

export const PetTabContent: FC<PetTabContentProps> = ({
    data,
    isEditing = false,
    onChange,
    index,
}) => {
    const [ageInput, setAgeInput] = useState(0);
    const [weightInput, setWeightInput] = useState(0);
    const [colorDescriptionInput, setColorDescriptionInput] = useState('');
    const [dietInput, setDietInput] = useState('');
    const [foodBrandInput, setFoodBrandInput] = useState('');
    const [foodPerMonthInput, setFoodPerMonthInput] = useState(0);

    return (
        <>
            <div className="mb-[50px]">
                <p className="font-bold">Name</p>
                <p>
                    {data.name}, {data.animal}
                </p>
            </div>
            <div className="mb-[50px] flex flex-wrap gap-x-[150px] gap-y-[50px]">
                <div>
                    <p className="font-bold">Age</p>
                    {isEditing ? (
                        <Input
                            type="number"
                            value={ageInput}
                            onChange={(e) =>
                                onChange((prev) => {
                                    const copy = deepClone(prev);
                                    copy.pets[index].age = parseInt(
                                        e.target.value
                                    );
                                    return copy;
                                })
                            }
                        />
                    ) : (
                        <p>{data.age} years old</p>
                    )}
                </div>
                <div>
                    <p className="font-bold">Weight</p>
                    {isEditing ? (
                        <Input
                            type="number"
                            value={weightInput}
                            onChange={(e) =>
                                onChange((prev) => {
                                    const copy = deepClone(prev);
                                    copy.pets[index].weight = e.target.value;
                                    return copy;
                                })
                            }
                        />
                    ) : (
                        <p>{data.weight}</p>
                    )}
                </div>
            </div>
            <div className="mb-[50px]">
                <p className="font-bold">Color / Description</p>
                {isEditing ? (
                    <Input
                        value={colorDescriptionInput}
                        onChange={(e) =>
                            onChange((prev) => {
                                const copy = deepClone(prev);
                                copy.pets[index].description = e.target.value;
                                return copy;
                            })
                        }
                    />
                ) : (
                    <p>{data.description}</p>
                )}
            </div>
            <div className="mb-[50px]">
                <p className="font-bold">Diet</p>
                {isEditing ? (
                    <Input
                        value={dietInput}
                        onChange={(e) => {
                            onChange((prev) => {
                                const copy = deepClone(prev);
                                copy.pets[index].diet = e.target.value;
                                return copy;
                            });
                        }}
                    />
                ) : (
                    <p>{data.diet}</p>
                )}
            </div>
            <div className="mb-[50px]">
                <p className="font-bold">Brand of Food</p>
                {isEditing ? (
                    <Input
                        value={foodBrandInput}
                        onChange={(e) => {
                            onChange((prev) => {
                                const copy = deepClone(prev);
                                copy.pets[index].food.kind = e.target.value;
                                return copy;
                            });
                        }}
                    />
                ) : (
                    <p>{data.food.kind}</p>
                )}
            </div>
            <div>
                <p className="font-bold">Amount of Food Per Month</p>
                {isEditing ? (
                    <Input
                        value={foodPerMonthInput}
                        onChange={(e) =>
                            onChange((prev) => {
                                const copy = deepClone(prev);
                                copy.pets[index].food.lbs = parseInt(
                                    e.target.value
                                );
                                return copy;
                            })
                        }
                    />
                ) : (
                    <p>{data.food.lbs}</p>
                )}
            </div>
        </>
    );
};
