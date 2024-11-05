import React, { useRef, useEffect, useState } from 'react';
import 'chart.js/auto';
import * as api from '@/services/api';
import TreeMapChart from "@/components/TreeMapChart";

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
        <div>
            {chartData ? (
                <div>
                    {/*// @ts-ignore*/}
                    <h3>{chartData.name}<span style={{ fontSize: '0.2em' }}>({new Date().toLocaleTimeString()})</span></h3>
                    <div style={{height:"300px"}}>
                        {/*// @ts-ignore*/}
                        <TreeMapChart titleText={chartData.name} seriesData={chartData.datasets} />
                    </div>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default LineChartLayout;
