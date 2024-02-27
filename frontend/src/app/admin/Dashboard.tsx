'use client';
import { useEffect, useState } from 'react';

export default function Dashboard() {
    const [data, setData] = useState<any>([]);

    const FAKE_DATA = [
        {
            Client: 'Attentive Aashita',
            'Site Location': 'Elgin',
            'Delivery Status': 'Delivered',
            'Client Details': 'Update',
        },
        {
            Client: 'Magnificent Michelle',
            'Site Location': 'Lockhart',
            'Delivery Status': 'Not Delivered',
            'Client Details': 'Update',
        },
        {
            Client: 'Awesome Ayah',
            'Site Location': 'McMahan',
            'Delivery Status': 'Not Delivered',
            'Client Details': 'Update',
        },
        {
            Client: 'Amazing Alisha',
            'Site Location': 'Trinity Lutheran',
            'Delivery Status': 'Delivered',
            'Client Details': 'OK',
        },
        {
            Client: 'Phenomenal Pavan',
            'Site Location': 'Camine',
            'Delivery Status': 'Not Delivered',
            'Client Details': 'OK',
        },
        {
            Client: 'Intricate Ismaeel',
            'Site Location': 'Camine',
            'Delivery Status': 'Delivered',
            'Client Details': 'OK',
        },
        {
            Client: 'Jolly Joanne',
            'Site Location': 'Lockhart',
            'Delivery Status': 'Not Delivered',
            'Client Details': 'OK',
        },
        {
            Client: 'Superb Sai',
            'Site Location': 'McMahan',
            'Delivery Status': 'Not Delivered',
            'Client Details': 'Update',
        },
        {
            Client: 'Magical Mi Lan',
            'Site Location': 'Trinity Lutheran',
            'Delivery Status': 'Delivered',
            'Client Details': 'OK',
        },
        {
            Client: 'Observant Omri',
            'Site Location': 'Flatonia',
            'Delivery Status': 'Not Delivered',
            'Client Details': 'Update',
        },
        {
            Client: 'Meticulous Matthew',
            'Site Location': 'Trinity Lutheran',
            'Delivery Status': 'Delivered',
            'Client Details': 'OK',
        },
        {
            Client: 'Terrific Tiffany',
            'Site Location': 'Elgin',
            'Delivery Status': 'Delivered',
            'Client Details': 'OK',
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
        <div className="p-4">
            {/* Search area */}
            <div className="flex justify-between">
                <input
                    type="text"
                    className="w-3/4 rounded-md"
                    placeholder="Search"
                />
                <select className="w-[10%] rounded-md">
                    <option selected>Filter by</option>
                    <optgroup label="Pet Type">
                        {pets.map((row: any, index: number) => (
                            <option key={index}>{row}</option>
                        ))}
                    </optgroup>
                    <optgroup label="Site Location">
                        {locations.map((row: any, index: number) => (
                            <option key={index}>{row}</option>
                        ))}
                    </optgroup>
                    <option>Brand</option>
                    <option>Food Cost Per Month</option>
                </select>
                <select className="w-[10%] rounded-md">
                    <option>Sort by</option>
                </select>
            </div>

            {/* Table of admin client data */}
            <table className="w-full border-separate border-spacing-2">
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
                                        'Delivery Status',
                                        'Client Details',
                                    ];
                                    if (centeredColumns.includes(key))
                                        cellClass += ' text-center';

                                    // Left Border for Client name column
                                    if (key === 'Client')
                                        cellClass +=
                                            ' border-l-4 border-tertiary';

                                    return (
                                        <td
                                            className={`rounded-md ${cellClass} px-2`}
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
        </div>
    );
}
