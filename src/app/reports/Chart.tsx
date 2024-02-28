'use client';
import { useEffect, useState, useRef } from 'react';
import ChartJS from 'chart.js/auto';
import {calculateLbsPerBrand} from './Dashboard';
//import 'chartjs-adapter-date-fns'; // Import adapter for date formatting (optional)

interface PieChartData {
    labels: string[];
    data: number[];
    foodOrders: { [key: string]: number };
    costs: number[];
    backgroundColor: string[];
}

const Chart: React.FC<{ data: any[] }> = ({ data }) => {
    const [chartData, setChartData] = useState<PieChartData | null>(null);
    const [foodOrders, setFoodOrders] = useState<{ [key: string]: number }>({});
    // Declare foodOrders at a higher scope level

    const chartRef = useRef<ChartJS<"doughnut", number[], string> | null>(null); 

    useEffect(() => {
        // Extracting data for the chart
        const labels: string[] = data.map((item: any) => item.Brand);
        const foodOrdersData: { [key: string]: number } = calculateLbsPerBrand(data);
        const costs: number[] = data.map((item: any) => item['Total cost ($)']);
        const colors: string[] = ['#98F5E1', '#FFB7A9', '#A9BCFF', '#FFCF33']; 

        setFoodOrders(foodOrdersData); // Update foodOrders state

        const foodOrdersValues= Object.values(foodOrdersData);
        setChartData({
            labels,
            data: foodOrdersValues,
            foodOrders: foodOrdersData,
            costs,
            backgroundColor: colors,
        });
    }, [data]);

    useEffect(() => {
        if (chartRef.current) {
            // If chart already exists, destroy it first
            chartRef.current.destroy();
        }
        // Render chart using Chart.js
        if (chartData) {
            const ctx = document.getElementById('myChart') as HTMLCanvasElement;
            if (ctx) {
                const newChart = new ChartJS(ctx, {
                    type: 'doughnut',
                    data: {
                        labels: chartData.labels,
                        datasets: [{
                            data: chartData.data,
                            backgroundColor: chartData.backgroundColor,
                        }],
                    },
                    options: {
                        plugins: {
                            legend: {
                                display: false,
                            }
                        }
                    }
                });
                chartRef.current = newChart;
            }
        }
    }, [chartData]);

    const totalCostSum = chartData?.costs.reduce((acc, curr) => acc + curr, 0);
    //const totalFoodOrdersSum = chartData ? 
    //    Object.values(chartData.foodOrders).reduce((acc, curr) => acc + curr, 0) : 
    //    0;    
    const totalFoodOrdersSum = chartData?.data.reduce((acc, curr) => acc + curr, 0) || 0;
    return (
        <div className="space-y-12">
            <div className="flex items-center justify-center items-center h-15 w-full space-x-4">

                <div className="text-center w-1/4 h-full bg-lightTeal border border-blue-200 rounded-lg">
                    <div>
                        <p className="mt-2">Total Cost</p>
                        <p className="text-lg"><b>${totalCostSum}</b></p>
                    </div>
                </div>

                <div className="text-center w-1/4 h-full bg-lightTeal border border-blue-200 rounded-lg">
                    <div>
                        <p className="mt-2">Total Food Orders</p>
                        <p className="text-lg"><b>{totalFoodOrdersSum}</b> lbs</p>
                    </div>
                </div>

            </div>
            <div className="space-x-4 flex items-center justify-center">

                <div className="max-w-[40%]"> 
                    <canvas id="myChart"></canvas>
                </div>
                
                <div className="space-y-4 w-[35%]">
                        {Object.keys(foodOrders).map((brand, index) => (
                            <div key={index}>
                                <div className="bg-gray-200 h-2 rounded">
                                    <div
                                        className="h-full rounded"
                                        style={
                                            { width: `${(foodOrders[brand] / totalFoodOrdersSum) * 100}%`, 
                                            backgroundColor: `${(chartData?.backgroundColor[index % chartData?.backgroundColor.length])}`
                                        } 
                                        }
                                    ></div>
                                </div>
                                <div className="h-6">
                                    <p className="float-right text-sm"><b>Cost</b></p>
                                    <div className="h-[100%] flex items-center justify-center float-left">
                                        <div className="rounded h-2 w-2 float-left mr-1" style={
                                                {backgroundColor: `${(chartData?.backgroundColor[index % chartData?.backgroundColor.length])}`
                                            }
                                            }
                                        ></div>
                                    </div>
                                    <p className="mt-2 text-color:black">{brand}</p>
                                </div>
                                
                            </div>
                        ))}
                    </div>
                
            </div>
        </div>
    );
};

export default Chart;
