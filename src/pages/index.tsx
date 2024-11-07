import React, { useEffect, useState } from 'react';
import * as api from '@/services/api';
import ChartLayout from "@/layouts/ChartLayout";
import {API} from "../../typings";

export default function HomePage() {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [charts, setCharts] = useState<API.TChart[]>({} as API.TChart[]);
    const loadData = async () => {
        try {
            const result = await api.Charts();
            console.log(result)
            setCharts(result.data);
        } catch (error) {
            console.error('Error loading charts data:', error);
        }
    };
    useEffect(() => {
        loadData().then(r => {
            console.log("Init Completed")
            setIsLoaded(true)
        });
    }, []);

    return (
        <div>
            {isLoaded ? (
                charts.map((chart, index) => (
                    <div style={{float: 'left'}}>
                    <h3>[{chart.chart_id}]{chart.chart_name}<span style={{fontSize: '0.2em'}}>({new Date().toLocaleTimeString()})</span></h3>
                    <div style={{height: 300, minWidth: 400, float: 'left'}}><ChartLayout key={index} chartID={chart.chart_id} /></div>
                    </div>
                ))
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}
