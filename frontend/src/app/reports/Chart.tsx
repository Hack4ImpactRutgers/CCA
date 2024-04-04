'use client';
import { useEffect, useState, useRef, MouseEvent } from 'react';
import ChartJS from 'chart.js/auto';
import { calcAllLbsPerBrand, calculateLbsPerBrand } from './Dashboard';
import fetchClientById from './Dashboard';
import fetchOrderByLocation from './Dashboard';
import fetchOrderByBrand from './Dashboard';
import fetchOrderByDate from './Dashboard';
import { Button } from '@/components/core/Button';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';

import getSelectedLocation from './Dashboard';

//import 'chartjs-adapter-date-fns'; // Import adapter for date formatting (optional)

interface PieChartData {
    labels: string[];
    data: number[];
    foodOrders: { [key: string]: number };
    costs: number[];
    backgroundColor: string[];
}

const Chart: React.FC<{
    data: any[];
    exportable: any[];
    selectedLocation: string;
    selectedDate: Date;
}> = ({ data, exportable, selectedLocation, selectedDate }) => {
    const [chartData, setChartData] = useState<PieChartData | null>(null);
    const [foodOrders, setFoodOrders] = useState<{ [key: string]: number }>({});
    const [allFoodOrders, setAllFoodOrders] = useState<{
        [key: string]: number;
    }>({});
    const chartCanvasRef = useRef<HTMLCanvasElement>(null);
    const progressBars = useRef<HTMLDivElement>(null);

    // Declare foodOrders at a higher scope level

    const chartRef = useRef<ChartJS<'doughnut', number[], string> | null>(null);

    useEffect(() => {
        // Extracting data for the chart
        const labels: string[] = data.map((item: any) => item.foodItems.brand);
        const allFoodOrdersData: { [key: string]: number } =
            calcAllLbsPerBrand(exportable);
        const foodOrdersData: { [key: string]: number } =
            calculateLbsPerBrand(data);

        const costs: number[] = data.map((item: any) => item['Total cost ($)']);
        const colors: string[] = [
            '#98F5E1',
            '#FFB7A9',
            '#A9BCFF',
            '#FFCF33',
            '#92E08B',
        ];
        const colors1: string[] = [
            '#fbd4db',
            '#d3e6f4',
            '#bce2d5',
            '#b9b9d5',
            '#fcd1be',
        ];

        setFoodOrders(foodOrdersData); // Update foodOrders state
        setAllFoodOrders(allFoodOrdersData);

        const foodOrdersValues = Object.values(foodOrdersData);
        setChartData({
            labels,
            data: foodOrdersValues,
            foodOrders: foodOrdersData,
            costs,
            backgroundColor: colors,
        });
    }, [data, exportable]);

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
                        datasets: [
                            {
                                data: chartData.data,
                                backgroundColor: chartData.backgroundColor,
                            },
                        ],
                    },
                    options: {
                        plugins: {
                            legend: {
                                display: false,
                            },
                        },
                    },
                });
                chartRef.current = newChart;
            }
        }
    }, [chartData]);

    const totalCostSum = chartData?.costs.reduce((acc, curr) => acc + curr, 0);
    //const totalFoodOrdersSum = chartData ?
    //    Object.values(chartData.foodOrders).reduce((acc, curr) => acc + curr, 0) :
    //    0;
    const totalFoodOrdersSum =
        chartData?.data.reduce((acc, curr) => acc + curr, 0) || 0;

    const months: { [key: number]: string } = {
        1: 'January',
        2: 'February',
        3: 'March',
        4: 'April',
        5: 'May',
        6: 'June',
        7: 'July',
        8: 'August',
        9: 'September',
        10: 'October',
        11: 'November',
        12: 'December',
    };

    const exportToPDF = (
        data: { [key: string]: number },
        chartCanvas: HTMLCanvasElement,
        progressBars: HTMLDivElement
    ) => {
        const doc = new jsPDF();
        doc.setFont('Times-Roman', 'normal');
        const fileName = 'Animeals_Reports_Data.pdf';
        doc.text('Animeals on Wheels Reports Data', 10, 10);
        doc.text('Location: ' + selectedLocation, 10, 20);
        if (selectedDate) {
            doc.text(
                months[selectedDate.getMonth()] +
                    ', ' +
                    selectedDate.getFullYear(),
                10,
                30
            );
        } else {
            doc.text('All Times', 10, 30);
        }

        // Add chart canvas to PDF
        const canvasDataURL = chartCanvas.toDataURL('image/png');
        const width = chartCanvas.width / 8;
        const height = chartCanvas.height / 8;
        doc.addImage(canvasDataURL, 'PNG', 10, 40, width, height);

        // Convert progressBars to an image using html2canvas
        html2canvas(progressBars).then((canvas) => {
            // Convert the canvas to a data URL
            const barsDataURL = canvas.toDataURL('image/jpeg');

            // Add the image to the PDF document
            doc.addImage(
                barsDataURL,
                'JPEG',
                width + 80,
                40,
                canvas.width / 10,
                canvas.height / 10
            );

            // Add data as a table to PDF
            let y = 0;
            if (canvas.height / 10 >= chartCanvas.height / 8) {
                y = canvas.height / 10 + 40;
            } else {
                y = chartCanvas.height / 8 + 40;
            }
            y += 10;
            const columns = ['Brand', 'Weight (lbs)'];
            const rows: any[][] = Object.keys(data).map((key) => [
                key,
                data[key],
            ]);

            (doc as any).autoTable({
                head: [columns],
                body: rows,
                startY: y,
                theme: 'grid',
                font: 'times',
            });

            // Save PDF
            doc.save(fileName);
        });
    };

    const exportToCSV = (data: { [key: string]: number }) => {
        const fileName = 'Animeals_Reports_Data.csv';
        let csvContent = 'Brand,Weight (lbs)\n'; // Column titles
        // Add data rows
        for (const key in allFoodOrders) {
            csvContent += `${key},${allFoodOrders[key]}\n`;
        }

        // Create CSV file and initiate download
        const encodedUri = encodeURI(
            'data:text/csv;charset=utf-8,' + csvContent
        );
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
    };

    return (
        <div className="space-y-12">
            <div className="h-15 flex w-full items-center items-center justify-center space-x-4">
                {/*<div className="text-center w-1/4 h-full bg-lightTeal border border-blue-200 rounded-lg">
                    <div>
                        <p className="mt-2">Total Cost</p>
                        <p className="text-lg"><b>${totalCostSum}</b></p>
                    </div>
                </div>*/}

                <div className="bg-lightTeal h-full w-1/4 rounded-lg border border-blue-200 text-center">
                    <div>
                        <p className="mt-2">Total Food Orders</p>
                        <p className="text-lg">
                            <b>{totalFoodOrdersSum}</b> lbs
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center space-x-4">
                <div className="ml-5 min-w-[40%] max-w-[40%]">
                    <canvas id="myChart" ref={chartCanvasRef}></canvas>
                </div>

                <div
                    className="w-[35%] space-y-4"
                    id="progressBars"
                    ref={progressBars}
                >
                    {Object.keys(foodOrders).map((brand, index) => (
                        <div key={index}>
                            <div className="h-2 rounded bg-gray-100">
                                <div
                                    className="h-full rounded"
                                    style={{
                                        width: `${
                                            (foodOrders[brand] /
                                                totalFoodOrdersSum) *
                                            100
                                        }%`,
                                        backgroundColor: `${chartData
                                            ?.backgroundColor[
                                            index %
                                                chartData?.backgroundColor
                                                    .length
                                        ]}`,
                                    }}
                                ></div>
                            </div>
                            <div className="h-6">
                                <p className="float-right text-sm">
                                    <b>%</b>
                                </p>
                                <p className="float-right mr-1 text-sm">
                                    <b>
                                        {(
                                            (foodOrders[brand] /
                                                totalFoodOrdersSum) *
                                            100
                                        ).toFixed(2)}{' '}
                                    </b>
                                </p>
                                <div className="float-left flex h-[100%] items-center justify-center">
                                    <div
                                        className="float-left mr-1 h-2 w-2 rounded"
                                        style={{
                                            backgroundColor: `${chartData
                                                ?.backgroundColor[
                                                index %
                                                    chartData?.backgroundColor
                                                        .length
                                            ]}`,
                                        }}
                                    ></div>
                                </div>
                                <p className="text-color:black mt-2">{brand}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex items-center justify-center space-x-4">
                <Button
                    text={'Export Chart to CSV'}
                    onClick={() => {
                        exportToCSV(allFoodOrders);
                    }}
                />
                <Button
                    text={'Export Chart to PDF'}
                    onClick={() => {
                        if (chartCanvasRef.current && progressBars.current) {
                            exportToPDF(
                                allFoodOrders,
                                chartCanvasRef.current,
                                progressBars.current
                            );
                        }
                    }}
                />
            </div>
        </div>
    );
};

export default Chart;
