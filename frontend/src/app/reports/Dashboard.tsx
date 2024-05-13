'use client';
import { MouseEvent, useEffect, useState } from 'react';
import Chart from './Chart';
import { Button } from '@/components/core/Button';
import { useUserContext } from '@/context/userContext';

export function getWeightsByLocation(
    orderData: any[],
    locationName: string
): any[] {
    const locations = [
        'Bastrop County - Bastrop',
        'Bastrop County - Elgin',
        'Bastrop County - Smithville',
        'Bastrop County - Cedar Creek',
        'Bastrop County - McDade',
        'Blanco County - Johnson City Housing Auth',
        'Blanco County - Johnson City Resource Center',
        'Blanco County - Trinity Lutheran',
        'Caldwell County - Lockhart',
        'Caldwell County - Luling',
        'Caldwell County - Prairie Lea',
        'Caldwell County - McMahan',
        'Fayette County - La Grange',
        'Fayette County - Flatonia',
        'Fayette County - Schulenberg',
        'Fayette County - Carmine',
        'Hays County - San Marcos Housing Authority',
        'Hays County - San Marcos Senior Center',
        'Hays County - Kyle',
        'Hays County - La Vista',
        'Hays County - Wimberley',
        'Hays County - Buda',
        'Lee County - Giddings',
    ].sort();
    const counties = [
        'Bastrop County',
        'Blanco County',
        'Caldwell County',
        'Fayette County',
        'Hays County',
        'Lee County',
    ].sort();
    const countyLocations: { [key: string]: string[] } = {};

    // ARRAY OF COUNTY LOCATION : CITY LOCATION
    locations.forEach((location) => {
        const parts = location.split(' - ');
        const county = parts[0];
        const locationName = parts[1];

        if (!countyLocations[county]) {
            countyLocations[county] = [];
        }
        countyLocations[county].push(locationName);
    });

    const costsForLocation: any[] = [];

    if (counties.includes(locationName)) {
        orderData.forEach((order: any) => {
            //if (order.client) {
            //console.log(order.client.region)
            if (countyLocations[locationName].includes(order.client.region || order.client.city)) {
                costsForLocation.push(order);
            }
            //}else{console.log(order.id)}
        });
    } else {
        orderData.forEach((order: any) => {
            //if (order.client) {
            if (
                order.client.region.toLowerCase() == locationName.toLowerCase() || order.client.city.toLowerCase() == locationName.toLowerCase()
            ) {
                costsForLocation.push(order);
            }
            // }else{console.log(order.id)}
        });
    }
    return costsForLocation;
}




export function getWeightsByDate(orderData: any[], date: Date): any[] {
    const costsForDate: any[] = [];
    let index = 0;
    orderData.forEach((order: any) => {
        const orderDate: Date = new Date(order.createdOn);
        if (orderDate.getMonth() == date.getMonth()) {
            if (orderDate.getFullYear() == date.getFullYear()) {
                costsForDate.push(order);
                index++;
            }
        }
    });
    return costsForDate;
}




export function calculateLbsPerAnimal(orderData: any[]): {
    [key: string]: number;
} {
    const costPerBrand: { [key: string]: number } = {};
    orderData.forEach((order: any) => {

        // go into order's client
        // iterate through the pets
        // add the pets names (cats, dogs, etc.)

        if (order.client.pets !== undefined) {
            order.client.pets.forEach((pet: any , index: number) => {
                const animal = pet.animal.toLowerCase();
                const weight = order.foodItems[index].weight;
                costPerBrand[animal] = (costPerBrand[animal] || 0) + weight;
            });
        }



        /*if (order.foodItems !== undefined) {
            order.foodItems.forEach((foodItems: any) => {
                const brands = [
                    'Friskies',
                    'HEB Texas Pets',
                    'Nutrena',
                    'Wholesomes',
                    'Other',
                ];
                const brand = brands.includes(foodItems.brand)
                    ? foodItems.brand
                    : 'Other';
                const weight = foodItems.weight;


                costPerBrand[brand] = (costPerBrand[brand] || 0) + weight;
            });
        }*/

    });
    return costPerBrand;
}




/*export function calcAllLbsPerBrand(orderData: any[]): {
    [key: string]: number;
} {
    const costPerBrand: { [key: string]: number } = {};
    orderData.forEach((order: any) => {
        if (order.foodItems !== undefined) {
            order.foodItems.forEach((foodItems: any) => {
                const brands = [
                    'Friskies',
                    'HEB Texas Pets',
                    'Nutrena',
                    'Wholesomes',
                    'Other',
                ];
                const brand = brands.includes(foodItems.brand)
                    ? foodItems.brand
                    : foodItems.brand;
                const weight = foodItems.weight;
                costPerBrand[brand] = (costPerBrand[brand] || 0) + weight;
            });
        }
    });
    return costPerBrand;
}*/





/*export function calculateLbsPerOtherBrands(
    orderData: any[],
    otherBrands: string[]
): { [key: string]: number } {
    const lbsPerOtherBrand: { [key: string]: number } = {};
    orderData.forEach((order: any) => {
        if (order.foodItems !== undefined) {
            order.foodItems.forEach((foodItems: any) => {
                if (otherBrands.includes(foodItems.brand)) {
                    //const brands = ['Friskies','HEB Texas Pets', 'Nutrena', 'Wholesomes', 'Other']
                    //co nsole.log(otherBrands);
                    const brand = foodItems.brand;
                    const lbs = foodItems.weight;
                    lbsPerOtherBrand[brand] =
                        (lbsPerOtherBrand[brand] || 0) + lbs;
                    //co nsole.log(lbs);
                }
            });
        } else {
            console.log('error');
        }
    });
    const sortedEntries = Object.entries(lbsPerOtherBrand).sort(
        ([aKey, aValue], [bKey, bValue]) => {
            return aKey.localeCompare(bKey); // Sort alphabetically for other keys
        }
    );

    // Reconstruct object from sorted array
    const sortedLbsPerOtherBrand: { [key: string]: number } =
        Object.fromEntries(sortedEntries);

    return sortedLbsPerOtherBrand;
}*/




/*export function makeOtherBrandsArray(orderData: any[]): string[] {
    // THIS FUNCTION ADDS ALL OTHER BRANDS TO AN ARRAY REGARDLESS OF ORIGINAL BRANDS
    //const otherBrands: {[key: number]: string} = {}
    const otherBrands: string[] = [];
    let otherBrandsAmt = 0;
    const brands = [
        'Friskies',
        'HEB Texas Pets',
        'Nutrena',
        'Wholesomes',
        'Other',
    ];

    orderData.forEach((order: any) => {
        order.foodItems.forEach((foodItems: any) => {
            if (
                !otherBrands.includes(foodItems.brand) &&
                !brands.includes(foodItems.brand)
            ) {
                const brand = foodItems.brand;
                otherBrands[otherBrandsAmt] = brand;
                otherBrandsAmt++;
            } //FIX THIS UPPP
        });
    });
    return otherBrands;
}
*/




export function getTypesOfPets (orderData:any[]): string[]{
    const animalTypes: string[] = [];
    let otherBrandsAmt = 0;

    orderData.forEach((order: any) => {
        order.client.pets.forEach((pet: any) => {
            if (
                !animalTypes.includes(pet.animal.toLowerCase())
            ) {
                animalTypes[otherBrandsAmt] = pet.animal.toLowerCase();
                otherBrandsAmt++;
            } 
        });
    });
    return animalTypes;
}




export function filterBySuccessfulStatus(orderData: any[]): any[] {
    const filteredBySuccess: any[] = [];
    orderData.forEach((order: any) => {
        if (order.status.toLowerCase() == 'successful') {
            filteredBySuccess.push(order);
        }
    });
    return filteredBySuccess;
}

// client request: change by brand instead into by animal type
// currently at 

export default function Dashboard() {
    const [clientData, setClientData] = useState<any[]>([]); //type of clientModel
    const [orderData, setOrderData] = useState<any[]>([]); //type of orderModel
    const [displayedData, setDisplayedData] = useState<any[]>([]); //type of orderModel
    const API_BASE_URL = 'https://combined-community-action.vercel.app';
    let otherBrands1: string[] = [];
    const [otherBrands, setOtherBrands] = useState<any[]>([]);
    const [showBreakdown, setShowBreakdown] = useState<boolean>(false);
    const [selectedDate, setSelectedDate] = useState<any>(null);
    const [selectedBrand, setSelectedBrand] = useState<any>();
    const [selectedLocation, setSelectedLocation] =
        useState<any>('All Locations');
    const [previousOrderData, setPreviousOrderData] = useState<any[]>([]);
    const { accessToken } = useUserContext();

    const FAKE_ORDER_DATA=
    [{
        "client": {
            "_id": "65d91d857b2e523b16d35778",
            "name": "Adventurous Arjun",
            "age": 32,
            "region": "Lockhart",
            "city":"Lockhart",
            "pets": [
                {
                    "isActive": true,
                    "animal": "cat",
                    "vet": false,
                    "food":{
                      "kind": "HEB Texas Pets",
                      "lbs": 5
                    },
                    "lbs": 6
                },
                {
                    "isActive": true,
                    "animal": "small dog",
                    "vet": true,
                    "food": {
                      "kind": "Other",
                      "lbs": 6
                    },
                    "lbs": 10
                }
            ]
        },
        "createdOn": "2024-05-12T08:00:00.000Z",
        "deliverBy": "2024-05-13T12:00:00.000Z",
        "foodItems": [
          {
            "brand": "Acme Pet Foods",
            "weight": 2
          },
          {
            "brand": "Healthy Paws",
            "weight": 1.5
          }
        ],
        "status": "successful"
      },{
        "client": {
            "_id": "65d91d857b2e523b16d35778",
            "name": "Adventurous Arjun",
            "age": 32,
            "region": "Lockhart",
            "city":"Lockhart",
            "pets": [
                {
                    "isActive": true,
                    "animal": "cat",
                    "vet": false,
                    "food":{
                      "kind": "HEB Texas Pets",
                      "lbs": 5
                    },
                    "lbs": 6
                },
                {
                    "isActive": true,
                    "animal": "big dog",
                    "vet": true,
                    "food": {
                      "kind": "Other",
                      "lbs": 6
                    },
                    "lbs": 10
                }
            ]
        },
        "createdOn": "2024-05-12T08:00:00.000Z",
        "deliverBy": "2024-05-13T12:00:00.000Z",
        "foodItems": [
          {
            "brand": "Acme Pet Foods",
            "weight": 2
          },
          {
            "brand": "Healthy Paws",
            "weight": 5
          }
        ],
        "status": "successful"
      },
        {
        "client": {
            "_id": "65d91d857b2e523b16d35778",
            "name": "Adventurous Arjun",
            "age": 32,
            "region": "Lockhart",
            "city":"Lockhart",
            "pets": [
                {
                    "isActive": true,
                    "animal": "Cockatiel",
                    "vet": false,
                    "food":{
                      "kind": "HEB Texas Pets",
                      "lbs": 5
                    },
                    "lbs": 6
                },
                {
                    "isActive": true,
                    "animal": "medium dog",
                    "vet": true,
                    "food": {
                      "kind": "Other",
                      "lbs": 6
                    },
                    "lbs": 10
                }
            ]
        },
        "createdOn": "2024-05-12T08:00:00.000Z",
        "deliverBy": "2024-05-13T12:00:00.000Z",
        "foodItems": [
          {
            "brand": "Acme Pet Foods",
            "weight": 2
          },
          {
            "brand": "Healthy Paws",
            "weight": 1.5
          }
        ],
        "status": "successful"
      },
        {
        "client": {
            "_id": "65d91d857b2e523b16d35778",
            "name": "Adventurous Arjun",
            "age": 32,
            "region": "Lockhart",
            "city":"Lockhart",
            "pets": [
                {
                    "isActive": true,
                    "animal": "Cat",
                    "vet": false,
                    "food":{
                      "kind": "HEB Texas Pets",
                      "lbs": 5
                    },
                    "lbs": 6
                },
                {
                    "isActive": true,
                    "animal": "small dog",
                    "vet": true,
                    "food": {
                      "kind": "Other",
                      "lbs": 6
                    },
                    "lbs": 10
                }
            ]
        },
        "createdOn": "2024-05-12T08:00:00.000Z",
        "deliverBy": "2024-05-13T12:00:00.000Z",
        "foodItems": [
          {
            "brand": "Acme Pet Foods",
            "weight": 2
          },
          {
            "brand": "Healthy Paws",
            "weight": 1.5
          }
        ],
        "status": "successful"
      }
      ];

    

    // currently have the orderData filtered by successful status, the cost by brand has to be changed into cost by animal type

    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_API_BASE_URL + '/orders/all', {
            credentials: 'include',
            headers: {
                'cca-auth-token': accessToken,
            },
        })
            .then((response) => response.json())
            .then((orderData) => {
                setOrderData(filterBySuccessfulStatus(orderData));
                setDisplayedData(filterBySuccessfulStatus(orderData));
            }); // */ 
        
        /*setOrderData(filterBySuccessfulStatus(FAKE_ORDER_DATA));
        setDisplayedData(filterBySuccessfulStatus(FAKE_ORDER_DATA));
        // setOtherBrands(makeOtherBrandsArray(FAKE_ORDER_DATA));
        //*/
        //co nsole.log(otherBrands);
    }, []);


    if (orderData.length === 0)
        return (
            <div className="flex h-screen items-center justify-center bg-gray-100">
                <div className="font-roboto mb-2 mt-2 text-center text-2xl font-bold text-tertiary">
                    Loading...
                </div>
            </div>
        );

    const lbsPerAnimal = calculateLbsPerAnimal(displayedData);

    // CURRENT DATE
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    const monthYear = yyyy + '-' + mm;

    const pets = ['Dog', 'Cat', 'Bird'].sort();
    const locations = [
        'Bastrop County - Bastrop',
        'Bastrop County - Elgin',
        'Bastrop County - Smithville',
        'Bastrop County - Cedar Creek',
        'Bastrop County - McDade',
        'Blanco County - Johnson City Housing Auth',
        'Blanco County - Johnson City Resource Center',
        'Blanco County - Trinity Lutheran',
        'Caldwell County - Lockhart',
        'Caldwell County - Luling',
        'Caldwell County - Prairie Lea',
        'Caldwell County - McMahan',
        'Fayette County - La Grange',
        'Fayette County - Flatonia',
        'Fayette County - Schulenberg',
        'Fayette County - Carmine',
        'Hays County - San Marcos Housing Authority',
        'Hays County - San Marcos Senior Center',
        'Hays County - Kyle',
        'Hays County - La Vista',
        'Hays County - Wimberley',
        'Hays County - Buda',
        'Lee County - Giddings',
    ].sort();
    //const locationsNoCounty = ['Bastrop', 'Elgin', 'Smithville', 'Cedar Creek', 'McDade', 'Johnson City Housing Auth', 'Johnson City Resource Center', 'Trinity Lutheran', 'Lockhart', 'Luling', 'Prairie Lea', 'McMahan', 'La Grange', 'Flatonia', 'Schulenberg', 'Carmine', 'San Marcos Housing Authority', 'San Marcos Senior Center', 'Kyle', 'La Vista', 'Wimberley', 'Buda', 'Giddings'];
    const locationsNoCounty = locations.map((location) => {
        const parts = location.split(' - ');
        return parts.length > 1 ? parts[1] : location;
    });
    //co nsole.log(locationsNoCounty);
    const counties = [
        'Bastrop County',
        'Blanco County',
        'Caldwell County',
        'Fayette County',
        'Hays County',
        'Lee County',
    ].sort();
    const countyLocations: { [key: string]: string[] } = {};
    //fetchClientByID("65d91d857b2e523b16d35777");

    // ARRAY OF COUNTY LOCATION : CITY LOCATION
    locations.forEach((location) => {
        const parts = location.split(' - ');
        const county = parts[0];
        const locationName = parts[1];

        if (!countyLocations[county]) {
            countyLocations[county] = [];
        }
        countyLocations[county].push(locationName);
    });

    const petTypes = getTypesOfPets(orderData);

    const totalLbs = petTypes.map((type) => lbsPerAnimal[type]);
    //co nsole.log(totalOtherLbs);

    return (
        <div className="p-4 ">
            <div>
                <input
                    type="month"
                    id="start"
                    name="start"
                    min="2000-01"
                    className="bg-lightTeal ml-10 mt-[1%] max-w-[fit-content] rounded-md hover:bg-secondary hover:text-white"
                    onChange={(event) => {
                        const chosenDate = event.target.value;
                        const [year, month] = chosenDate.split('-');
                        //console.log(year+"-"+month);
                        if (year != null && month != null) {
                            if (
                                selectedLocation != null &&
                                selectedLocation != 'All Locations'
                            ) {
                                setDisplayedData(
                                    getWeightsByLocation(
                                        getWeightsByDate(
                                            orderData,
                                            new Date(
                                                parseInt(year),
                                                parseInt(month) - 1,
                                                1
                                            )
                                        ),
                                        selectedLocation
                                    )
                                );
                            } else {
                                setDisplayedData(
                                    getWeightsByDate(
                                        orderData,
                                        new Date(
                                            parseInt(year),
                                            parseInt(month) - 1,
                                            1
                                        )
                                    )
                                );
                            }
                            setSelectedDate(
                                new Date(parseInt(year), parseInt(month) - 1, 1)
                            );
                        } else {
                            if (
                                selectedLocation != null &&
                                selectedLocation != 'All Locations'
                            ) {
                                setDisplayedData(
                                    getWeightsByLocation(
                                        orderData,
                                        selectedLocation
                                    )
                                );
                            } else {
                                setDisplayedData(orderData);
                            }
                            //co nsole.log("undefined!")
                            //setOrderData(orderData);//setOrderData(fetchAllOrders());
                            setSelectedDate(null);
                        }
                    }}
                />

                <select
                    onChange={(event) => {
                        //console.log(event.target.value);
                        setSelectedLocation(event.target.value);
                        if (selectedDate != null) {
                            if (event.target.value == 'All Locations') {
                                setDisplayedData(
                                    getWeightsByDate(orderData, selectedDate)
                                );
                            } else {
                                setDisplayedData(
                                    getWeightsByLocation(
                                        getWeightsByDate(
                                            orderData,
                                            selectedDate
                                        ),
                                        event.target.value
                                    )
                                );
                            }
                        } else {
                            if (event.target.value == 'All Locations') {
                                setDisplayedData(orderData);
                            } else {
                                setDisplayedData(
                                    getWeightsByLocation(
                                        orderData,
                                        event.target.value
                                    )
                                );
                            }
                        }
                    }}
                    className="bg-lightTeal ml-10 mt-[1%] max-w-[fit-content] rounded-md hover:bg-secondary hover:text-white"
                >
                    <option>All Locations</option>
                    {counties.map((county) => (
                        <optgroup key={county} label={county}>
                            <option key={county} value={county}>
                                All of {county}
                            </option>
                            {countyLocations[county].map((location) => (
                                <option key={location} value={location}>
                                    {location}
                                </option>
                            ))}
                        </optgroup>
                    ))}
                </select>
            </div>

            {/* Table of orderData by brand*/}
            <div className="m-auto mt-[1%]">
                <div className="float-left m-auto mt-[1%] flex w-[50%] flex-col">
                    <table className="float-left mt-[1%] w-full border-separate border-spacing-2">
                        <thead>
                            <tr>
                                <th className="text-tertiary">Type of Pet</th>
                                <th className="text-tertiary">
                                    Total food orders (lbs)
                                </th>
                                {/*<th className="text-tertiary">Total cost ($)</th> {/* Placeholder for empty column */}
                            </tr>
                        </thead>
                        <tbody>
                            {petTypes.map((type, index) => (
                                <tr key={index}>
                                    <td className="w-[50%] rounded-md bg-[#F5F5F5] p-2 text-center">
                                        {type}
                                    </td>
                                    <td className="w-[50%] rounded-md bg-[#F5F5F5] p-2 text-center">
                                        {totalLbs[index] | 0}
                                    </td>
                                    {/*<td className="bg-[#F5F5F5] rounded-md p-2 text-center"></td>*/}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="float-left h-[55%] w-[45%]">
                    <Chart
                        data={displayedData}
                        exportable={displayedData}
                        selectedLocation={selectedLocation}
                        selectedDate={selectedDate}
                    />
                </div>
            </div>
        </div>
    );
}
