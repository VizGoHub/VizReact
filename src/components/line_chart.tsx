import React, { useRef, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import * as api from '@/services/api';

const LineChart = ({ chartID }: { chartID: number }) => {
    const chartRef = useRef(null);
    const [chartData, setChartData] = useState(null);
    const options = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    const loadData = async (chartID : number) => {
        try {
            const result = await api.Chart(chartID);
            // @ts-ignore
            setChartData(result.data);
        } catch (error) {
            console.error('Error loading chart data:', error);
        }
    };

    useEffect(() => {
        const loadDataWithTimeout = () => {
            loadData(chartID).then(r => {
                console.log("Chat Loaded, ChartID=", chartID)
            });
            setTimeout(loadDataWithTimeout, 5000);
        };

        // Initial load
        loadDataWithTimeout();

        // Cleanup function to prevent memory leaks
        return () => {};
    }, [chartID]);

    return (
        <div>
            {chartData ? (
                <>
                    {/*// @ts-ignore*/}
                    <h3>{chartData.name}<span style={{ fontSize: '0.2em' }}>({new Date().toLocaleTimeString()})</span></h3>
                    <Line ref={chartRef} data={chartData} options={options} />
                </>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default LineChart;
