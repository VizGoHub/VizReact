import React, {useEffect, useState, useCallback} from 'react';
import * as api from "@/services/api";
import {API} from "../../typings";
import ChartView from "@/components/ChartView";

const ChartLayout = ({ chartID}: { chartID: number }) => {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [chartData, setChartData] = useState<API.TChartData>({} as API.TChartData);

    const loadData = useCallback(async (chartID: number) => {
        try {
            const result = await api.ChartData(chartID);
            if (result && result.code === 0) {
                setChartData(result.data)
                setIsLoaded(true)
            }
        } catch (error) {
            console.error('Error loading chart data:', error);
        }
    }, []);

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

    if(isLoaded){
        return <ChartView chartID={chartID} scripts={chartData.chart.chart_code} data={chartData}/>;
    }
};

export default ChartLayout;
