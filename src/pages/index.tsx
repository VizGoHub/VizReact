import React, { useEffect, useState } from 'react';
import * as api from '@/services/api';
import ChartLayout from "@/layouts/ChartLayout";
import {API} from "../../typings";
import {Link} from "@@/exports";
import {EditOutlined} from "@ant-design/icons";

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
                        <h4>
                            <span style={{paddingRight: 5}}>
                                <Link to={"/editor/" + chart.chart_id} ><EditOutlined style={{ fontSize: '16px', color: '#08c' }} /></Link>
                            </span>
                            <span>[{chart.chart_id}]{chart.chart_name}</span>
                            <span style={{fontSize: '0.2em'}}>({new Date().toLocaleTimeString()})</span>
                        </h4>
                        <div style={{height: 300, minWidth: 400, float: 'left'}}><ChartLayout key={index} chartID={chart.chart_id} /></div>
                    </div>
                ))
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}
