import { Client, Pet } from '@/types/backend';
import { FC, useState } from 'react';
import { Input } from '@/components/client-dashboard/ClientDetailsPopup/components/Input';

interface PetTabContentProps {
    data: Client;
    isEditing?: boolean;
}

export const PetTabContent: FC<PetTabContentProps> = ({
    data,
    isEditing = false,
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
                <p>Poppy, {data.animal}</p>
            </div>
            <div className="mb-[50px] flex flex-wrap gap-x-[150px] gap-y-[50px]">
                <div>
                    <p className="font-bold">Age</p>
                    {isEditing ? (
                        <Input
                            type="number"
                            value={ageInput}
                            onChange={(e) =>
                                setAgeInput(parseInt(e.target.value))
                            }
                        />
                    ) : (
                        <p>5 years old</p>
                    )}
                </div>
                <div>
                    <p className="font-bold">Weight</p>
                    {isEditing ? (
                        <Input
                            type="number"
                            value={weightInput}
                            onChange={(e) =>
                                setWeightInput(parseInt(e.target.value))
                            }
                        />
                    ) : (
                        <p>{data.food.lbs}</p>
                    )}
                </div>
            </div>
            <div className="mb-[50px]">
                <p className="font-bold">Color / Description</p>
                {isEditing ? (
                    <Input
                        value={colorDescriptionInput}
                        onChange={(e) =>
                            setColorDescriptionInput(e.target.value)
                        }
                    />
                ) : (
                    <p>DESCRIPTION</p>
                )}
            </div>
            <div className="mb-[50px]">
                <p className="font-bold">Diet</p>
                {isEditing ? (
                    <Input
                        value={dietInput}
                        onChange={(e) => setDietInput(e.target.value)}
                    />
                ) : (
                    <p>DIET</p>
                )}
            </div>
            <div className="mb-[50px]">
                <p className="font-bold">Brand of Food</p>
                {isEditing ? (
                    <Input
                        value={foodBrandInput}
                        onChange={(e) => setFoodBrandInput(e.target.value)}
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
                            setFoodPerMonthInput(parseInt(e.target.value))
                        }
                    />
                ) : (
                    <p>{data.food.lbs}</p>
                )}
            </div>
        </>
    );
};
