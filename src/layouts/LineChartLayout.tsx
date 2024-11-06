import React, { useRef, useEffect, useState } from 'react';
import 'chart.js/auto';
import * as api from '@/services/api';
import LineChart from "@/components/LineChart";
import BarChart from "@/components/BarChart";

const LineChartLayout = ({ chartID }: { chartID: number }) => {
    const chartRef = useRef(null);
    const [chartData, setChartData] = useState(null);
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
                console.log("Chart Loaded, ChartID=", chartID)
            });
            setTimeout(loadDataWithTimeout, 10000);
        };

        // Initial load
        loadDataWithTimeout();

        // Cleanup function to prevent memory leaks
        return () => {};
    }, [chartID]);


    return (
        <>
            {chartData ? (
                /*// @ts-ignore*/
                <LineChart  titleText={chartData.name}  legendData={chartData.legends} xAxisData={chartData.labels} seriesData={chartData.datasets} />

            ) : (
                <>Loading...</>
            )}
        </>
    );
};

export default LineChartLayout;
