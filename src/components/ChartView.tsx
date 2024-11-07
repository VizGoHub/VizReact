import React, {useEffect, useRef} from 'react';
import * as echarts from 'echarts';
import {API} from "../../typings";

interface ChartViewProps {
    chartID: number;
    scripts: string;
    data: API.TChartData;
}

const ChartView: React.FC<ChartViewProps> = ({chartID, scripts, data }) => {
    const chartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const chartDom = chartRef.current!;
        const myChart = echarts.init(chartDom);
        let option: echarts.EChartsOption = {}

        try {
            try {
                eval(scripts)
                // @ts-ignore
                myChart.setOption(option);
            } catch (error) {
                console.log(error)
            }
        } catch (error) {

        }

        const resizeObserver = new ResizeObserver(() => {
            myChart.resize();
        });

        resizeObserver.observe(chartDom);

        return () => {
            myChart.dispose();
            resizeObserver.disconnect();
        };
    }, [chartID, scripts, data]);

    return <div ref={chartRef} style={{ width: '100%', height: '100%' }} />;

};

export default ChartView;
