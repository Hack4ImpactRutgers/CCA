'use client';
import { useEffect, useState } from 'react';
import Chart from './Chart';


export function calculateLbsPerBrand(data: any[]): { [key: string]: number } {
    const lbsPerBrand: { [key: string]: number } = {};
    data.forEach((client: any) => {
        client.pets.forEach((pet: any) => {
            
            const brands = ['Friskies','HEB Texas Pets', 'Nutrena', 'Wholesomes', 'Other']
            const brand = brands.includes(pet.food) ? pet.food : 'Other';
            const lbs = pet.lbs;
            lbsPerBrand[brand] = (lbsPerBrand[brand] || 0) + lbs;
        });
    });
    return lbsPerBrand;
}

export default function Dashboard() {
    const [data, setData] = useState<any>([]);

    const FAKE_DATA = [
        {
            "_id": "65d91d857b2e523b16d35777",
            "name": "Attentive Aashita",
            "age": 25,
            "region": "Elgin",
            "pets": [
                {
                    "isActive": true,
                    "animal": "large dog",
                    "vet": true,
                    "food": "HEB Texas Pets",
                    "lbs": 8
                },
                {
                    "isActive": true,
                    "animal": "small dog",
                    "vet": true,
                    "food": "HEB Texas Pets",
                    "lbs": 8
                }
            ]
        },
        {
            "_id": "65d91d857b2e523b16d35778",
            "name": "Magnificent Michelle",
            "age": 25,
            "region": "Lockhart",
            "pets": [
                {
                    "isActive": false,
                    "animal": "small dog",
                    "vet": true,
                    "food": "Friskies",
                    "lbs": 5
                },
                {
                    "isActive": true,
                    "animal": "cat",
                    "vet": false,
                    "food": "Wholesomes",
                    "lbs": 2
                }
            ]
        },
        {
            "_id": "65d91d857b2e523b16d35779",
            "name": "Awesome Ayah",
            "age": 22,
            "region": "McMahan",
            "pets": []
        },
        {
            "_id": "65d91d857b2e523b16d3577a",
            "name": "Amazing Alisha",
            "age": 24,
            "region": "Trinity Lutheran",
            "pets": []
        },
        {
            "_id": "65d91d857b2e523b16d3577b",
            "name": "Phenomenal Pavan",
            "age": 25,
            "region": "Camine",
            "pets": [
                {
                    "isActive": true,
                    "animal": "small dog",
                    "vet": true,
                    "food": "Friskies",
                    "lbs": 5
                },
                {
                    "isActive": false,
                    "animal": "cat",
                    "vet": false,
                    "food": "Nutrena",
                    "lbs": 2
                }
            ]
        },
        {
            "_id": "65d91d857b2e523b16d3577c",
            "name": "Intricate Ismaeel",
            "age": 25,
            "region": "Camine",
            "pets": []
        },
        {
            "_id": "65d91d857b2e523b16d3577d",
            "name": "Jolly Joanne",
            "age": 31,
            "region": "Lockhart",
            "pets": []
        },
        {
            "_id": "65d91d857b2e523b16d3577e",
            "name": "Superb Sai",
            "age": 28,
            "region": "McMahan",
            "pets": []
        },
        {
            "_id": "65d91d857b2e523b16d3577f",
            "name": "Magical Mi Lan",
            "age": 38,
            "region": "Trinity Lutheran",
            "pets": []
        },
        {
            "_id": "65d91d857b2e523b16d35780",
            "name": "Observant Omri",
            "age": 31,
            "region": "Flatonia",
            "pets": []
        },
        {
            "_id": "65d91d857b2e523b16d35781",
            "name": "Meticulous Matthew",
            "age": 420,
            "region": "Trinity Lutheran",
            "pets": []
        },
        {
            "_id": "65d91d857b2e523b16d35782",
            "name": "Terrific Tiffany",
            "age": 90,
            "region": "Elgin",
            "pets": []
        }
    ]
    ;

    useEffect(() => {
        fetch('https://combined-community-action.vercel.app/client/all')
            .then(response => response.json())
            .then(data => setData(data));// */
        //setData(FAKE_DATA);
    }, []);

    // TODO: Replace with better looking loading screen
    if (data.length === 0) return <div>Loading...</div>;

    // Calculate total lbs per brand
    // dataProcessing.ts
    
    const lbsPerBrand = calculateLbsPerBrand(data); //array
    

    const pets = ['Dog', 'Cat', 'Bird'].sort();
    const locations=['Bastrop County - Bastrop', 'Bastrop County - Elgin', 'Bastrop County - Smithville', 'Bastrop County - Cedar Creek', 'Bastrop County - McDade', 'Blanco County - Johnson City Housing Auth', 'Blanco County - Johnson City Resource Center', 'Blanco County - Trinity Lutheran', 'Caldwell County - Lockhart', 'Caldwell County - Luling', 'Caldwell County - Prairie Lea', 'Caldwell County - McMahan', 'Fayette County - La Grange', 'Fayette County - Flatonia', 'Fayette County - Schulenberg', 'Fayette County - Carmine', 'Hays County - San Marcos Housing Authority', 'Hays County - San Marcos Senior Center', 'Hays County - Kyle', 'Hays County - La Vista', 'Hays County - Wimberley', 'Hays County - Buda', 'Lee County - Giddings'].sort();
    const locationsNoCounty = locations.map(location => {
        const parts = location.split(' - ');
        return parts.length > 1 ? parts[1] : location;
    });
    const counties = ['Bastrop County','Blanco County','Caldwell County','Fayette County','Hays County','Lee County'].sort();
    const countyLocations: { [key: string]: string[] } = {};

    locations.forEach(location => {
        const parts = location.split(' - ');
        const county = parts[0];
        const locationName = parts[1];
        
        if (!countyLocations[county]) {
            countyLocations[county] = [];
        }
        countyLocations[county].push(locationName);
    });

    const brands = ['Friskies','HEB Texas Pets', 'Nutrena', 'Wholesomes', 'Other']
    //const brands2 = Object.keys(lbsPerBrand).sort();
    const totalLbs = brands.map(brand => lbsPerBrand[brand]);

    return (
        <div className="p-4 ">
            {/* Search area */}
            <div className="flex justify-center">
                <input
                    type="text"
                    className="w-[82%] rounded-md"
                    placeholder="Search"
                />
                <select className="max-w-[fit-content] rounded-md ml-10 bg-lightTeal hover:bg-secondary hover:text-white">
                    <option>Sort by</option>
                    <option>Highest to Lowest</option>
                    <option>Lowest to Highest</option>
                </select>
            </div>

            <div>
                <select className="max-w-[fit-content] rounded-md ml-10 bg-lightTeal hover:bg-secondary hover:text-white mt-[1%]">
                    <option>Date</option>
                </select>
                <select className="max-w-[fit-content] rounded-md ml-10 bg-lightTeal hover:bg-secondary hover:text-white mt-[1%]">
                    <option>Location</option>
                    {counties.map(county => (
                        <optgroup key={county} label={county}>
                            {countyLocations[county].map(location => (
                                <option key={location}>{location}</option>
                            ))}
                        </optgroup>
                    ))}
                </select>
                <select className="max-w-[fit-content] rounded-md ml-10 bg-lightTeal hover:bg-secondary hover:text-white mt-[1%]">
                    <option>Brand</option>
                    {brands.map((row: any, index: number) => (
                        <option key={index}>{row}</option>
                    ))}
                </select>
            </div>

            {/* Table of admin client data */}
            <div className="m-auto">
                <table className="w-[55%] border-separate border-spacing-2 mt-[1%] float-left">
                    <thead>
                        <tr>
                            <th className="text-tertiary">Brand</th>
                            <th className="text-tertiary">Total food orders (lbs)</th>
                            <th className="text-tertiary">Total cost ($)</th> {/* Placeholder for empty column */}
                        </tr>
                    </thead>
                    <tbody>
                        {brands.map((brand, index) => (
                            <tr key={index}>
                                <td className="bg-[#F5F5F5] rounded-md p-2 border-l-4 border-tertiary">{brand}</td>
                                <td className="bg-[#F5F5F5] rounded-md p-2 text-center">{totalLbs[index]}</td>
                                <td className="bg-[#F5F5F5] rounded-md p-2 text-center"></td>
                            </tr>
                        ))}
                        
                    </tbody>
                </table>
                <div className="w-[45%] float-left h-[55%]">
                    <Chart data={data}/>
                </div>
            </div>
            
        </div>
    );
}
