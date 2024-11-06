import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

interface BarChartProps {
    titleText: string;
    yAxisData: any;
    seriesData: any[];
}

const BarChart: React.FC<BarChartProps> = ({ titleText, yAxisData, seriesData }) => {
    const chartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const chartDom = chartRef.current!;
        const myChart = echarts.init(chartDom);
        const option: echarts.EChartsOption = {
            title : {
                //text: titleText,
            },
            xAxis: {
                max: 'dataMax',
            },
            yAxis : yAxisData,
            legend: {
                show: true
            },
            series: seriesData
        };

        myChart.setOption(option);

        const resizeObserver = new ResizeObserver(() => {
            myChart.resize();
        });

        resizeObserver.observe(chartDom);

        return () => {
            myChart.dispose();
            resizeObserver.disconnect();
        };
    }, [titleText, yAxisData, seriesData]);

    return <div ref={chartRef} style={{ width: '100%', height: '100%' }} />;

};

export default BarChart;
