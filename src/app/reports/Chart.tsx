'use client';
import { useEffect, useState, useRef } from 'react';
import ChartJS from 'chart.js/auto';
//import 'chartjs-adapter-date-fns'; // Import adapter for date formatting (optional)

interface PieChartData {
    labels: string[];
    foodOrders: number[];
    data: number[];
    backgroundColor: string[];
}

const Chart: React.FC<{ data: any[] }> = ({ data }) => {
    const [chartData, setChartData] = useState<PieChartData | null>(null);

    const chartRef = useRef<ChartJS<"doughnut", number[], string> | null>(null); // Specify type as Chart | null


    useEffect(() => {
        // Extracting data for the chart
        const labels: string[] = data.map((item: any) => item.Brand);
        const foodOrders: number[] = data.map((item: any) => item['Total food orders (lbs)']);
        const costs: number[] = data.map((item: any) => item['Total cost ($)']);
        const colors: string[] = ['#98F5E1', '#FFB7A9', '#A9BCFF', '#FFCF33']; // Color array for each slice
                                //'#FFCF33', '#98F5E1', '#A9BCFF', '#FFB7A9'
        setChartData({
            labels,
            foodOrders,
            data: costs,
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

    const totalCostSum = data.reduce((acc, curr) => acc + curr['Total cost ($)'], 0);
    const totalFoodOrdersSum = chartData?.foodOrders.reduce((acc, curr) => acc + curr, 0);
    
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
                        {data.map((item, index) => (
                            <div key={index}>
                                <div className="bg-gray-200 h-2 rounded">
                                    <div
                                        className="h-full rounded"
                                        style={
                                            { width: `${(item['Total cost ($)'] / totalCostSum) * 100}%`, 
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
                                    <p className="mt-2 text-color:black">{item.Brand}</p>
                                </div>
                                
                            </div>
                        ))}
                    </div>
                
            </div>
        </div>
    );
};

export default Chart;
