'use client';
import { useEffect, useState } from 'react';
import Loading from '@/components/core/Loading';
import { Button } from '@/components/core/Button';

export default function Dashboard() {
    const [query, setQuery] = useState<string>(''); // Search query
    const [data, setData] = useState<any>([]);
    const [filteredData, setFilteredData] = useState<any>([]);
    const [selectedClientID, setSelectedClientID] = useState<any>(null);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/client/all`)
            .then((response) => response.json())
            .then((data) => {
                setData(data);
                setFilteredData(data);
            });

        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/order/all`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            });
    }, []);

    // Effect to filter data whenever the search query changes
    useEffect(() => {
        const result = data.filter((item: any) =>
            Object.values(item).some((value: any) =>
                value.toString().toLowerCase().includes(query.toLowerCase())
            )
        );
        setFilteredData(result);
    }, [query, data]);

    if (data.length === 0) return <Loading />;

    // const pets = ['Dog', 'Cat', 'Bird'].sort(); // Replace with actual logic later
    // const locations = Array.from(
    //     new Set(data.map((row: any) => row['Site Location']))
    // ).sort();

    // if (selectedClientID != null) {
    //     return (
    //         <ClientDetailsPopup
    //             clientID={selectedClientID}
    //             setSelectedClientID={setSelectedClientID}
    //         />
    //     );
    // }

    return (
        <div className="p-4">
            {/* Search area */}
            <div className="flex justify-between">
                <input
                    type="text"
                    className="w-3/4 rounded-md"
                    placeholder="Search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                {/* Commenting these select boxes out for now since I don't have any information to make these work */}
                {/* <select className="w-[10%] rounded-md">
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
                </select> */}
            </div>

            {/* Table of admin client data */}
            <table className="w-full border-separate border-spacing-2">
                <thead>
                    <tr>
                        <th className="text-tertiary">Client</th>
                        <th className="text-tertiary">Site Location</th>
                        <th className="text-tertiary">Delivery Status</th>
                        <th className="text-tertiary">Client Details</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((row: any, rowIndex: number) => (
                        <tr key={rowIndex}>
                            <td className="rounded-md border-l-4 border-tertiary bg-[#F5F5F5] px-3 py-1">
                                {row['name']}
                            </td>
                            <td className="rounded-md bg-[#F5F5F5] px-3 py-1">
                                {row['region']}
                            </td>
                            <td className="rounded-md bg-[#F5F5F5] px-3 py-1 text-center">
                                ?
                            </td>
                            <td
                                className="rounded-md bg-[#F5F5F5] px-3 py-1 text-center hover:cursor-pointer"
                                onClick={() => {
                                    setSelectedClientID(row['_id']);
                                }}
                            >
                                Edit
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
