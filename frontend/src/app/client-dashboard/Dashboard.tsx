'use client';
import { useEffect, useState } from 'react';
import Loading from '@/components/core/Loading';
import { ClientDetailsPopup } from '@/components/client-dashboard/ClientDetailsPopup/ClientDetailsPopup';
import { Client } from '@/types/backend';
import { useUserContext } from '@/context/userContext';

export default function Dashboard() {
    const [query, setQuery] = useState<string>(''); // Search query
    const [data, setData] = useState<any>([]);
    const [filteredData, setFilteredData] = useState<any>([]);
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);
    const [orders, setOrders] = useState<any>([]);
    const [filter, setFilter] = useState<string>('all');
    const [sortBy, setSortBy] = useState<string>('default');
    const { accessToken } = useUserContext();

    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_API_BASE_URL + '/client/all', {
            credentials: 'include',
            body: JSON.stringify({ token: accessToken }),
        })
            .then((response) => response.json())
            .then((data) => {
                setData(data);
                setFilteredData(data);
                console.log('oiajwdawoidawoijawjiodwaiojdoiajwdijoaw');
            })
            .catch((err) => console.log('awd', err));

        fetch(process.env.NEXT_PUBLIC_API_BASE_URL + '/orders/all', {
            credentials: 'include',
            body: JSON.stringify({ token: accessToken }),
        })
            .then((response) => response.json())
            .then((data) => {
                setOrders(data);
            });
    }, [accessToken]);

    // Effect to filter data whenever the search query changes
    useEffect(() => {
        // Intersection of typed query, filter, and sorting

        // Filter by typed query matching all fields and filter dropdown
        const result = data.filter((row: any) => {
            if (filter === 'all') {
                return Object.values(row).some((value: any) => {
                    if (typeof value === 'string') {
                        return value
                            .toLowerCase()
                            .includes(query.toLowerCase());
                    }
                    return false;
                });
            } else {
                return (
                    (Object.values(row).some((value: any) => {
                        if (typeof value === 'string') {
                            return value
                                .toLowerCase()
                                .includes(query.toLowerCase());
                        }
                        return false;
                    }) &&
                        row['pets'].some(
                            (pet: any) =>
                                pet['animal'].toLowerCase() ===
                                filter.toLowerCase()
                        )) ||
                    row['region'].toLowerCase() === filter.toLowerCase() ||
                    row['pets'].some(
                        (pet: any) =>
                            pet['food'].toLowerCase() === filter.toLowerCase()
                    )
                );
            }
        });

        // Sort by
        if (sortBy === 'clientName') {
            result.sort((a: any, b: any) => a['name'].localeCompare(b['name']));
        } else if (sortBy === 'siteLocation') {
            result.sort((a: any, b: any) =>
                a['region'].localeCompare(b['region'])
            );
        } else if (sortBy === 'deliveryStatus') {
            result.sort((a: any, b: any) => {
                const aOrders = orders.filter(
                    (order: any) => order.Client._id == (a as any)._id
                );
                const bOrders = orders.filter(
                    (order: any) => order.Client._id == (b as any)._id
                );
                const aLatestOrder = aOrders.sort(
                    (a: any, b: any) =>
                        new Date(b.deliverBy).getTime() -
                        new Date(a.deliverBy).getTime()
                )[0];
                const bLatestOrder = bOrders.sort(
                    (a: any, b: any) =>
                        new Date(b.deliverBy).getTime() -
                        new Date(a.deliverBy).getTime()
                )[0];
                return aLatestOrder.status.localeCompare(bLatestOrder?.status);
            });
        } else if (sortBy === 'clientDetails') {
            result.sort((a: any, b: any) => {
                const aNeedsUpdate = a['needsUpdate'] ?? false;
                const bNeedsUpdate = b['needsUpdate'] ?? false;
                return aNeedsUpdate === bNeedsUpdate
                    ? 0
                    : aNeedsUpdate
                      ? -1
                      : 1;
            });
        }

        setFilteredData(result);
    }, [query, filter, data, sortBy, orders]);

    const onPopupClose = () => setSelectedClient(null);
    const onPopupSubmit = (updatedClient: Client) => {
        fetch(
            process.env.NEXT_PUBLIC_API_BASE_URL +
                `/client/${updatedClient.id}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...updatedClient, token: accessToken }),
            }
        )
            .then((response) => response.json())
            .then((respdata) => {
                if (respdata.error) {
                    console.error(respdata.error);
                    return;
                }
            });
    };

    if (data.length === 0) return <Loading />;

    function toTitleCase(str: string) {
        return str
            .split(' ')
            .map(
                (word) =>
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            )
            .join(' ');
    }

    const pets = Array.from(
        new Set(
            data
                .map((row: any) => row['pets'])
                .flat()
                .map((pet: any) => toTitleCase(pet['animal']) ?? '')
                .sort()
        )
    );
    const locations = Array.from(
        new Set(data.map((row: any) => toTitleCase(row['region'])).sort())
    );
    const foodBrands = Array.from(
        new Set(
            orders
                .map((row: any) => row['foodItems'])
                .flat()
                .map((food: any) => toTitleCase(food['brand']))
                .sort()
        )
    );

    if (selectedClient != null) {
        return (
            <ClientDetailsPopup
                client={selectedClient}
                onSubmit={onPopupSubmit}
                onClose={onPopupClose}
            />
        );
    }

    return (
        <div className="p-4">
            {/* Search area */}
            <div className="flex justify-between gap-3">
                <input
                    type="text"
                    className="w-3/4 rounded-md"
                    placeholder="Search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <select
                    value={filter}
                    onChange={(event: any) => setFilter(event.target.value)}
                    className="w-[15%] rounded-md"
                >
                    <option value="all">Filter by (All)</option>
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
                    <optgroup label="Food Brand">
                        {foodBrands.map((row: any, index: number) => (
                            <option key={index}>{row}</option>
                        ))}
                    </optgroup>
                </select>
                <select
                    value={sortBy}
                    onChange={(event: any) => setSortBy(event.target.value)}
                    className="w-[15%] rounded-md"
                >
                    <option value="default">Sort by (default)</option>
                    <option value="clientName">Client Name</option>
                    <option value="siteLocation">Site Location</option>
                    <option value="deliveryStatus">Delivery Status</option>
                    <option value="clientDetails">Client Details</option>
                </select>
            </div>

            {/* Table of admin client data */}
            <table className="max-h-full w-full border-separate border-spacing-2">
                <thead>
                    <tr>
                        <th className="text-tertiary">Client</th>
                        <th className="text-tertiary">Site Location</th>
                        <th className="text-tertiary">Delivery Status</th>
                        <th className="text-tertiary">Client Details</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((row: any, rowIndex: number) => {
                        // Delivery Status
                        const client = row as Client;
                        const clientOrders = orders.filter(
                            (order: any) =>
                                order.Client._id == (client as any)._id
                        );
                        const clientOrdersSorted = clientOrders.sort(
                            (a: any, b: any) =>
                                new Date(b.deliverBy).getTime() -
                                new Date(a.deliverBy).getTime()
                        );
                        const latestOrder = clientOrdersSorted[0];

                        // Edit button needsUpdate
                        const needsUpdate = row['needsUpdate'] ?? false;

                        return (
                            <tr key={rowIndex}>
                                <td className="rounded-md border-l-4 border-tertiary bg-[#F5F5F5] px-3 py-1">
                                    {toTitleCase(row['name'])}
                                </td>
                                <td className="rounded-md bg-[#F5F5F5] px-3 py-1">
                                    {toTitleCase(row['region'])}
                                </td>
                                <td
                                    className="cursor-help rounded-md bg-[#F5F5F5] px-3 py-1 text-center"
                                    title={`Created: ${new Date(
                                        latestOrder?.createdOn
                                    ).toLocaleString()}\nDelivery By: ${new Date(
                                        latestOrder?.deliverBy
                                    ).toLocaleString()}`}
                                >
                                    {toTitleCase(latestOrder?.status ?? '')}
                                </td>
                                <td
                                    className={`rounded-md bg-[#F5F5F5] px-3 py-1 text-center text-[16px] font-bold text-white hover:cursor-pointer ${
                                        needsUpdate
                                            ? 'bg-[#F16363]'
                                            : 'bg-[#ABCF38]'
                                    }`}
                                    onClick={() => {
                                        setSelectedClient(row as Client);
                                    }}
                                >
                                    {needsUpdate ? 'UPDATE' : 'VIEW'}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
