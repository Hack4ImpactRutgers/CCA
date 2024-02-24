'use client';
import { useEffect, useState } from 'react';
import Chart from './Chart';

export default function Dashboard() {
    const [data, setData] = useState<any>([]);

    const FAKE_DATA = [
        {
            Brand: 'HEB Texas Pets',
            'Total food orders (lbs)': 25,
            'Total cost ($)': 170.45,
        },
        {
            Brand: 'Friskies',
            'Total food orders (lbs)': 25,
            'Total cost ($)': 123.45,
        },
        {
            Brand: 'Wholesomes',
            'Total food orders (lbs)': 25,
            'Total cost ($)': 123.45,
        },
        {
            Brand: 'Nutrena',
            'Total food orders (lbs)': 25,
            'Total cost ($)': 123.45,
        },
    ];

    useEffect(() => {
        // Replace this with appropriate API call when implementable
        // fetch('https://someapi.org/list/clients')
        //     .then(response => response.json())
        //     .then(data => setData(data));
        setData(FAKE_DATA);
    }, []);

    // TODO: Replace with better looking loading screen
    if (data.length === 0) return <div>Loading...</div>;

    const pets = ['Dog', 'Cat', 'Bird'].sort(); // Replace with actual logic later
    const locations = Array.from(
        new Set(data.map((row: any) => row['Site Location']))
    ).sort();

    return (
        <div className="p-4 ">
            {/* Search area */}
            <div className="flex justify-center">
                <input
                    type="text"
                    className="w-[82%] rounded-md"
                    placeholder="Search"
                />
                <select className="max-w-[fit-content] rounded-md ml-10 bg-gray-100 hover:bg-secondary hover:text-white">
                    <option>Sort by</option>
                </select>
            </div>

            <div>
                <select className="max-w-[fit-content] rounded-md ml-10 bg-gray-100 hover:bg-secondary hover:text-white mt-[1%]">
                    <option>Date</option>
                </select>
                <select className="max-w-[fit-content] rounded-md ml-10 bg-gray-100 hover:bg-secondary hover:text-white mt-[1%]">
                    <option>Site Location</option>
                </select>
                <select className="max-w-[fit-content] rounded-md ml-10 bg-gray-100 hover:bg-secondary hover:text-white mt-[1%]">
                    <option>Brand</option>
                </select>
            </div>

            {/* Table of admin client data */}
            <div className="m-auto">
                <table className="w-[55%] border-separate border-spacing-2 mt-[1%] float-left">
                    <thead>
                        <tr>
                            {Object.keys(data[0]).map((key, index) => (
                                <th className="text-tertiary" key={index}>
                                    {key}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row: any, rowIndex: number) => (
                            <tr key={rowIndex}>
                                {Object.entries(row).map(
                                    ([key, value], cellIndex) => {
                                        let cellClass = '';

                                        // Status Background Color
                                        if (key !== 'Client Details')
                                            cellClass = 'bg-[#F5F5F5]';
                                        else if (key === 'Client Details') {
                                            cellClass +=
                                                value === 'Update'
                                                    ? 'bg-[#F16363]'
                                                    : 'bg-primary';
                                            cellClass +=
                                                ' text-white uppercase font-bold';
                                        }

                                        // Centered Columns
                                        let centeredColumns = [
                                            'Total food orders (lbs)',
                                            'Total cost ($)',
                                        ];
                                        if (centeredColumns.includes(key))
                                            cellClass += ' text-center';

                                        // Left Border for Client name column
                                        if (key === 'Brand')
                                            cellClass +=
                                                ' border-l-4 border-tertiary';

                                        return (
                                            <td
                                                className={`rounded-md ${cellClass} p-2`}
                                                key={cellIndex}
                                            >
                                                {value as string}
                                            </td>
                                        );
                                    }
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="w-[45%] float-left h-[55%]">
                    <Chart data={FAKE_DATA}/>
                </div>
            </div>
            
        </div>
    );
}
