import { useEffect, useRef, useState } from 'react';
import * as api from '@/services/api';
import LineChartLayout from   '@/layouts/LineChartLayout'
import ChartLayout from "@/layouts/ChartLayout";

export default function HomePage() {
    const [chartsData, setChartsData] = useState(null);
    const loadData = async () => {
        try {
            const result = await api.Charts();
            // @ts-ignore
            setChartsData(result.data);
        } catch (error) {
            console.error('Error loading charts data:', error);
        }
    };
    useEffect(() => {
        loadData().then(r => {
            console.log("Init Completed")
        });
    }, []);

    return (
        <div>
            {chartsData ? (
                // @ts-ignore
                chartsData.map((chart, index) => (
                    <ChartLayout key={index} chartID={chart.chartID} chartType={chart.chartType} />
                ))
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}
