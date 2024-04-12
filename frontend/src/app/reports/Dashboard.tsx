'use client';
import { MouseEvent, useEffect, useState } from 'react';
import Chart from './Chart';
import { Button } from '@/components/core/Button';
//import Client from '../../../../backend/schemas/client_schema';
import { Server } from 'http';
//import { Request, Response, NextFunction } from 'express';
//import Volunteer from '../volunteer/page'
//import { ______ } from "../backend/routes/order_route.ts";
//import orderModel from '../../../../backend/schemas/order_schema';

//const response = await request(server).get(`/admin/${adminId}`);

/**
 TO DO:
 - only have ACTIVE pets
 - filters
 - order's client's location
 - look at each order's client and filter by their location
 - order's brands
 - look at the chosen brand and display the weight only for that
 - look at each order's brands and sort the weight and brand for each
 - order's dates
 - take the chosen date and compare its month and year to the
 data's month and year
 - look at each order's dates and
 */

//co nsole.log("month:" + new Date("2016-09-23T12:00:00Z").getMonth());

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
            //if (order.Client) {
            //console.log(order.Client.region)
            if (countyLocations[locationName].includes(order.Client.region)) {
                costsForLocation.push(order);
            }
            //}else{console.log(order.id)}
        });
    } else {
        orderData.forEach((order: any) => {
            //if (order.Client) {
            if (
                order.Client.region.toLowerCase() == locationName.toLowerCase()
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

//      BY ORDERRRRR

export function calculateLbsPerBrand(orderData: any[]): {
    [key: string]: number;
} {
    const costPerBrand: { [key: string]: number } = {};
    orderData.forEach((order: any) => {
        if (order.foodItems !== undefined) {
            order.foodItems.forEach((foodItem: any) => {
                const brands = [
                    'Friskies',
                    'HEB Texas Pets',
                    'Nutrena',
                    'Wholesomes',
                    'Other',
                ];
                const brand = brands.includes(foodItem.brand)
                    ? foodItem.brand
                    : 'Other';
                const weight = foodItem.weight;
                costPerBrand[brand] = (costPerBrand[brand] || 0) + weight;
            });
        }
    });
    return costPerBrand;
}

export function calcAllLbsPerBrand(orderData: any[]): {
    [key: string]: number;
} {
    const costPerBrand: { [key: string]: number } = {};
    orderData.forEach((order: any) => {
        if (order.foodItems !== undefined) {
            order.foodItems.forEach((foodItem: any) => {
                const brands = [
                    'Friskies',
                    'HEB Texas Pets',
                    'Nutrena',
                    'Wholesomes',
                    'Other',
                ];
                const brand = brands.includes(foodItem.brand)
                    ? foodItem.brand
                    : foodItem.brand;
                const weight = foodItem.weight;
                costPerBrand[brand] = (costPerBrand[brand] || 0) + weight;
            });
        }
    });
    return costPerBrand;
}

export function calculateLbsPerOtherBrands(
    orderData: any[],
    otherBrands: string[]
): { [key: string]: number } {
    const lbsPerOtherBrand: { [key: string]: number } = {};
    orderData.forEach((order: any) => {
        if (order.foodItems !== undefined) {
            order.foodItems.forEach((foodItem: any) => {
                if (otherBrands.includes(foodItem.brand)) {
                    //const brands = ['Friskies','HEB Texas Pets', 'Nutrena', 'Wholesomes', 'Other']
                    //co nsole.log(otherBrands);
                    const brand = foodItem.brand;
                    const lbs = foodItem.weight;
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
}

export function makeOtherBrandsArray(orderData: any[]): string[] {
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
        order.foodItems.forEach((foodItem: any) => {
            if (
                !otherBrands.includes(foodItem.brand) &&
                !brands.includes(foodItem.brand)
            ) {
                const brand = foodItem.brand;
                otherBrands[otherBrandsAmt] = brand;
                otherBrandsAmt++;
            } //FIX THIS UPPP
        });
    });
    return otherBrands;
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

    const FAKE_ORDER_DATA = [
        {
            client: {
                _id: '65d91d857b2e523b16d35778',
                name: 'Adventurous Arjun',
                age: 32,
                region: 'Lockhart',
                pets: [
                    {
                        isActive: true,
                        animal: 'cat',
                        vet: false,
                        food: 'Friskies',
                        lbs: 6,
                    },
                    {
                        isActive: true,
                        animal: 'small dog',
                        vet: true,
                        food: 'HEB Texas Pets',
                        lbs: 10,
                    },
                ],
            },
            createdOn: new Date('2015-07-15T12:00:00Z'),
            deliverBy: new Date('2015-07-15T12:00:00Z'),
            foodItems: [
                {
                    brand: 'Friskies',
                    weight: 6,
                },
                {
                    brand: 'HEB Texas Pets',
                    weight: 10,
                },
            ],
            status: 'successful',
        },
        {
            client: {
                _id: '65d91d857b2e523b16d35779',
                name: 'Brave Bianca',
                age: 28,
                region: 'Wimberley',
                pets: [
                    {
                        isActive: true,
                        animal: 'large dog',
                        vet: true,
                        food: 'Nutrena',
                        lbs: 12,
                    },
                ],
            },
            createdOn: new Date('2016-09-23T12:00:00Z'),
            deliverBy: new Date('2016-09-23T12:00:00Z'),
            foodItems: [
                {
                    brand: 'Nutrena',
                    weight: 12,
                },
            ],
            status: 'successful',
        },
        {
            client: {
                _id: '65d91d857b2e523b16d3577a',
                name: 'Caring Cody',
                age: 45,
                region: 'La Vista',
                pets: [
                    {
                        isActive: true,
                        animal: 'large dog',
                        vet: false,
                        food: 'Wholesomes',
                        lbs: 15,
                    },
                ],
            },
            createdOn: new Date('2017-04-17T12:00:00Z'),
            deliverBy: new Date('2017-04-17T12:00:00Z'),
            foodItems: [
                {
                    brand: 'Wholesomes',
                    weight: 15,
                },
            ],
            status: 'successful',
        },
        {
            client: {
                _id: '65d91d857b2e523b16d3577b',
                name: 'Daring Daisy',
                age: 37,
                region: 'Giddings',
                pets: [
                    {
                        isActive: true,
                        animal: 'cat',
                        vet: true,
                        food: 'Friskies',
                        lbs: 7,
                    },
                ],
            },
            createdOn: new Date('2018-11-04T12:00:00Z'),
            deliverBy: new Date('2018-11-04T12:00:00Z'),
            foodItems: [
                {
                    brand: 'Friskies',
                    weight: 7,
                },
            ],
            status: 'successful',
        },
        {
            client: {
                _id: '65d91d857b2e523b16d3577c',
                name: 'Energetic Elena',
                age: 29,
                region: 'Schulenberg',
                pets: [
                    {
                        isActive: true,
                        animal: 'small dog',
                        vet: true,
                        food: 'Foodimals',
                        lbs: 9,
                    },
                    {
                        isActive: true,
                        animal: 'small dog',
                        vet: true,
                        food: 'Petsmart',
                        lbs: 8,
                    },
                ],
            },
            createdOn: new Date('2019-02-21T12:00:00Z'),
            deliverBy: new Date('2019-02-21T12:00:00Z'),
            foodItems: [
                {
                    brand: 'Foodimals',
                    weight: 9,
                },
                {
                    brand: 'Petsmart',
                    weight: 8,
                },
            ],
            status: 'successful',
        },
        {
            client: {
                _id: '65d91d857b2e523b16d3577d',
                name: 'Fearless Fernando',
                age: 41,
                region: 'Buda',
                pets: [
                    {
                        isActive: true,
                        animal: 'cat',
                        vet: false,
                        food: 'Friskies',
                        lbs: 5,
                    },
                ],
            },
            createdOn: new Date('2010-10-19T12:00:00Z'),
            deliverBy: new Date('2010-10-19T12:00:00Z'),
            foodItems: [
                {
                    brand: 'Friskies',
                    weight: 5,
                },
            ],
            status: 'successful',
        },
        {
            client: {
                _id: '65d91d857b2e523b16d3577e',
                name: 'Gentle Giselle',
                age: 33,
                region: 'prairie Lea',
                pets: [
                    {
                        isActive: true,
                        animal: 'large dog',
                        vet: true,
                        food: 'HEB Texas Pets',
                        lbs: 18,
                    },
                ],
            },
            createdOn: new Date('2010-10-28T12:00:00Z'),
            deliverBy: new Date('2010-10-28T12:00:00Z'),
            foodItems: [
                {
                    brand: 'HEB Texas Pets',
                    weight: 18,
                },
            ],
            status: 'successful',
        },
        {
            client: {
                _id: '65d91d857b2e523b16d3577f',
                name: 'Helpful Hector',
                age: 49,
                region: 'Johnson City Resource Center',
                pets: [
                    {
                        isActive: true,
                        animal: 'large dog',
                        vet: true,
                        food: 'Nutrena',
                        lbs: 14,
                    },
                ],
            },
            createdOn: new Date('2012-01-14T12:00:00Z'),
            deliverBy: new Date('2012-01-14T12:00:00Z'),
            foodItems: [
                {
                    brand: 'Nutrena',
                    weight: 14,
                },
            ],
            status: 'successful',
        },
        // Add 12 more orders below:
        {
            client: {
                _id: '65d91d857b2e523b16d35780',
                name: 'Graceful Gabrielle',
                age: 31,
                region: 'Flatonia',
                pets: [
                    {
                        isActive: true,
                        animal: 'cat',
                        vet: true,
                        food: 'Petsmart',
                        lbs: 6,
                    },
                ],
            },
            createdOn: new Date('2021-03-10T12:00:00Z'),
            deliverBy: new Date('2021-03-10T12:00:00Z'),
            foodItems: [
                {
                    brand: 'Petsmart',
                    weight: 6,
                },
            ],
            status: 'failed',
        },
        {
            client: {
                _id: '65d91d857b2e523b16d35781',
                name: 'Harmonious Harper',
                age: 42,
                region: 'Carmine',
                pets: [
                    {
                        isActive: true,
                        animal: 'large dog',
                        vet: false,
                        food: 'Friskies',
                        lbs: 10,
                    },
                ],
            },
            createdOn: new Date('2021-05-05T12:00:00Z'),
            deliverBy: new Date('2021-05-05T12:00:00Z'),
            foodItems: [
                {
                    brand: 'Friskies',
                    weight: 10,
                },
            ],
            status: 'pending',
        },
        {
            client: {
                _id: '65d91d857b2e523b16d35782',
                name: 'Inventive Isaac',
                age: 35,
                region: 'San Marcos Housing Authority',
                pets: [
                    {
                        isActive: true,
                        animal: 'cat',
                        vet: true,
                        food: 'BirdFoods',
                        lbs: 8,
                    },
                ],
            },
            createdOn: new Date('2021-08-20T12:00:00Z'),
            deliverBy: new Date('2021-08-20T12:00:00Z'),
            foodItems: [
                {
                    brand: 'BirdFoods',
                    weight: 8,
                },
            ],
            status: 'successful',
        },
        {
            client: {
                _id: '65d91d857b2e523b16d35783',
                name: 'Joyful Jordan',
                age: 30,
                region: 'San Marcos Senior Center',
                pets: [
                    {
                        isActive: true,
                        animal: 'small dog',
                        vet: false,
                        food: 'Fiesta',
                        lbs: 9,
                    },
                ],
            },
            createdOn: new Date('2021-10-15T12:00:00Z'),
            deliverBy: new Date('2021-10-15T12:00:00Z'),
            foodItems: [
                {
                    brand: 'Fiesta',
                    weight: 9,
                },
            ],
            status: 'pending',
        },
        {
            client: {
                _id: '65d91d857b2e523b16d35784',
                name: 'Keen Kelly',
                age: 48,
                region: 'Kyle',
                pets: [
                    {
                        isActive: true,
                        animal: 'large dog',
                        vet: true,
                        food: 'Wholesomes',
                        lbs: 16,
                    },
                ],
            },
            createdOn: new Date('2022-01-05T12:00:00Z'),
            deliverBy: new Date('2022-01-05T12:00:00Z'),
            foodItems: [
                {
                    brand: 'Wholesomes',
                    weight: 16,
                },
            ],
            status: 'successful',
        },
        {
            client: {
                _id: '65d91d857b2e523b16d35785',
                name: 'Loyal Liam',
                age: 34,
                region: 'La Vista',
                pets: [
                    {
                        isActive: true,
                        animal: 'small dog',
                        vet: true,
                        food: 'Nutrena',
                        lbs: 12,
                    },
                ],
            },
            createdOn: new Date('2022-03-10T12:00:00Z'),
            deliverBy: new Date('2022-03-10T12:00:00Z'),
            foodItems: [
                {
                    brand: 'Nutrena',
                    weight: 12,
                },
            ],
            status: 'successful',
        },
        {
            client: {
                _id: '65d91d857b2e523b16d35786',
                name: 'Merry Melissa',
                age: 39,
                region: 'Trinity Lutheran',
                pets: [
                    {
                        isActive: true,
                        animal: 'cat',
                        vet: false,
                        food: 'Foodimals',
                        lbs: 7,
                    },
                ],
            },
            createdOn: new Date('2022-04-18T12:00:00Z'),
            deliverBy: new Date('2022-04-18T12:00:00Z'),
            foodItems: [
                {
                    brand: 'Foodimals',
                    weight: 7,
                },
            ],
            status: 'successful',
        },
        {
            client: {
                _id: '65d91d857b2e523b16d35787',
                name: 'Noble Nathan',
                age: 43,
                region: 'Lockhart',
                pets: [
                    {
                        isActive: true,
                        animal: 'large dog',
                        vet: true,
                        food: 'Fiesta',
                        lbs: 22,
                    },
                ],
            },
            createdOn: new Date('2022-06-05T12:00:00Z'),
            deliverBy: new Date('2022-06-05T12:00:00Z'),
            foodItems: [
                {
                    brand: 'Fiesta',
                    weight: 22,
                },
            ],
            status: 'successful',
        },
        {
            client: {
                _id: '65d91d857b2e523b16d35788',
                name: 'Optimistic Olivia',
                age: 26,
                region: 'Prairie Lea',
                pets: [
                    {
                        isActive: true,
                        animal: 'cat',
                        vet: true,
                        food: 'Petsmart',
                        lbs: 6,
                    },
                ],
            },
            createdOn: new Date('2022-08-20T12:00:00Z'),
            deliverBy: new Date('2022-08-20T12:00:00Z'),
            foodItems: [
                {
                    brand: 'Petsmart',
                    weight: 6,
                },
            ],
            status: 'pending',
        },
        {
            client: {
                _id: '65d91d857b2e523b16d35789',
                name: 'Patient Paul',
                age: 51,
                region: 'La Vista',
                pets: [
                    {
                        isActive: true,
                        animal: 'small dog',
                        vet: false,
                        food: 'HEB Texas Pets',
                        lbs: 8,
                    },
                ],
            },
            createdOn: new Date('2022-10-15T12:00:00Z'),
            deliverBy: new Date('2022-10-15T12:00:00Z'),
            foodItems: [
                {
                    brand: 'HEB Texas Pets',
                    weight: 8,
                },
            ],
            status: 'successful',
        },
        {
            client: {
                _id: '65d91d857b2e523b16d3578a',
                name: 'Quirky Quentin',
                age: 38,
                region: 'Smithville',
                pets: [
                    {
                        isActive: true,
                        animal: 'cat',
                        vet: true,
                        food: 'Wholesomes',
                        lbs: 5,
                    },
                ],
            },
            createdOn: new Date('2022-12-25T12:00:00Z'),
            deliverBy: new Date('2022-12-25T12:00:00Z'),
            foodItems: [
                {
                    brand: 'Wholesomes',
                    weight: 5,
                },
            ],
            status: 'successful',
        },
        {
            client: {
                _id: '65d91d857b2e523b16d3578b',
                name: 'Resilient Rachel',
                age: 44,
                region: 'Giddings',
                pets: [
                    {
                        isActive: true,
                        animal: 'large dog',
                        vet: true,
                        food: 'Nutrena',
                        lbs: 18,
                    },
                ],
            },
            createdOn: new Date('2023-02-10T12:00:00Z'),
            deliverBy: new Date('2023-02-10T12:00:00Z'),
            foodItems: [
                {
                    brand: 'Nutrena',
                    weight: 18,
                },
            ],
            status: 'failed',
        },
        {
            client: {
                _id: '65d91d857b2e523b16d3578c',
                name: 'Sincere Sarah',
                age: 29,
                region: 'Bastrop',
                pets: [
                    {
                        isActive: true,
                        animal: 'small dog',
                        vet: true,
                        food: 'HEB Texas Pets',
                        lbs: 10,
                    },
                ],
            },
            createdOn: new Date('2023-03-20T12:00:00Z'),
            deliverBy: new Date('2023-03-20T12:00:00Z'),
            foodItems: [
                {
                    brand: 'HEB Texas Pets',
                    weight: 10,
                },
            ],
            status: 'successful',
        },
        {
            client: {
                _id: '65d91d857b2e523b16d3578d',
                name: 'Tender Thomas',
                age: 46,
                region: 'Luling',
                pets: [
                    {
                        isActive: true,
                        animal: 'cat',
                        vet: false,
                        food: 'Friskies',
                        lbs: 7,
                    },
                ],
            },
            createdOn: new Date('2023-04-05T12:00:00Z'),
            deliverBy: new Date('2023-04-05T12:00:00Z'),
            foodItems: [
                {
                    brand: 'Friskies',
                    weight: 7,
                },
            ],
            status: 'pending',
        },
        {
            client: {
                _id: '65d91d857b2e523b16d3578e',
                name: 'Understanding Ursula',
                age: 33,
                region: 'Wimberley',
                pets: [
                    {
                        isActive: true,
                        animal: 'large dog',
                        vet: true,
                        food: 'Foodimals',
                        lbs: 20,
                    },
                ],
            },
            createdOn: new Date('2023-06-15T12:00:00Z'),
            deliverBy: new Date('2023-06-15T12:00:00Z'),
            foodItems: [
                {
                    brand: 'Foodimals',
                    weight: 20,
                },
            ],
            status: 'successful',
        },
        {
            client: {
                _id: '65d91d857b2e523b16d3578f',
                name: 'Valiant Victor',
                age: 47,
                region: 'Elgin',
                pets: [
                    {
                        isActive: true,
                        animal: 'cat',
                        vet: true,
                        food: 'Fiesta',
                        lbs: 9,
                    },
                ],
            },
            createdOn: new Date('2023-08-02T12:00:00Z'),
            deliverBy: new Date('2023-08-02T12:00:00Z'),
            foodItems: [
                {
                    brand: 'Fiesta',
                    weight: 9,
                },
            ],
            status: 'successful',
        },
    ];

    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_API_BASE_URL + '/orders/all', {
            credentials: 'include',
        })
            .then((response) => response.json())
            .then((orderData) => {
                setOrderData(filterBySuccessfulStatus(orderData));
                setDisplayedData(filterBySuccessfulStatus(orderData));
            }); // */
        //setOrderData(filterBySuccessfulStatus(FAKE_ORDER_DATA));
        //setDisplayedData(filterBySuccessfulStatus(FAKE_ORDER_DATA));
        //setOtherBrands(makeOtherBrandsArray(FAKE_ORDER_DATA));
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

    const lbsPerBrand = calculateLbsPerBrand(displayedData);
    const lbsPerOtherBrands = calculateLbsPerOtherBrands(
        displayedData,
        otherBrands
    );

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

    const brands = [
        'Friskies',
        'HEB Texas Pets',
        'Nutrena',
        'Wholesomes',
        'Other',
    ];

    const totalLbs = brands.map((brand) => lbsPerBrand[brand]);
    const totalOtherLbs = otherBrands.map(
        (otherBrand) => lbsPerOtherBrands[otherBrand]
    );
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
                                <th className="text-tertiary">Brand</th>
                                <th className="text-tertiary">
                                    Total food orders (lbs)
                                </th>
                                {/*<th className="text-tertiary">Total cost ($)</th> {/* Placeholder for empty column */}
                            </tr>
                        </thead>
                        <tbody>
                            {brands.map((brand, index) => (
                                <tr key={index}>
                                    <td className="w-[50%] rounded-md bg-[#F5F5F5] p-2 text-center">
                                        {brand}
                                    </td>
                                    <td className="w-[50%] rounded-md bg-[#F5F5F5] p-2 text-center">
                                        {totalLbs[index] | 0}
                                    </td>
                                    {/*<td className="bg-[#F5F5F5] rounded-md p-2 text-center"></td>*/}
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <Button
                        className="flex h-[25px] w-[240px] place-items-center justify-around rounded-[10px] bg-gray-100 text-center text-sm font-bold text-secondary"
                        text={
                            showBreakdown
                                ? 'Hide Breakdown of Others'
                                : 'Show Breakdown of Others'
                        }
                        onClick={() => {
                            if (showBreakdown) {
                                setOtherBrands(makeOtherBrandsArray([]));
                                //
                            } else {
                                if (
                                    selectedLocation != null &&
                                    selectedLocation != 'All Locations'
                                ) {
                                    if (selectedDate != null) {
                                        setOtherBrands(
                                            makeOtherBrandsArray(
                                                getWeightsByDate(
                                                    getWeightsByLocation(
                                                        orderData,
                                                        selectedLocation
                                                    ),
                                                    selectedDate
                                                )
                                            )
                                        );
                                        setDisplayedData(
                                            getWeightsByDate(
                                                getWeightsByLocation(
                                                    orderData,
                                                    selectedLocation
                                                ),
                                                selectedDate
                                            )
                                        );
                                    } else {
                                        setOtherBrands(
                                            makeOtherBrandsArray(orderData)
                                        );
                                    }
                                } else {
                                    if (selectedDate != null) {
                                        setOtherBrands(
                                            makeOtherBrandsArray(
                                                getWeightsByDate(
                                                    orderData,
                                                    selectedDate
                                                )
                                            )
                                        );
                                        setDisplayedData(
                                            getWeightsByDate(
                                                orderData,
                                                selectedDate
                                            )
                                        );
                                    } else {
                                        setOtherBrands(
                                            makeOtherBrandsArray(orderData)
                                        );
                                    }
                                }
                                //
                            }
                            setShowBreakdown(!showBreakdown);
                        }}
                    />

                    <table className="float-left mt-[1%] w-full border-separate border-spacing-2">
                        <tbody>
                            {otherBrands.map((otherBrand, index) => (
                                <tr key={index}>
                                    <td className="w-[50%] rounded-md bg-[#F5F5F5] p-2 text-center">
                                        {otherBrand}
                                    </td>
                                    <td className="w-[50%] rounded-md bg-[#F5F5F5] p-2 text-center">
                                        {totalOtherLbs[index] | 0}
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
