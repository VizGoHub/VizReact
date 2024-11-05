import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

interface TreeMapChartProps {
    titleText: string;
    seriesData: any[];
}

const TreeMapChart: React.FC<TreeMapChartProps> = ({ titleText, seriesData }) => {
    const chartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const chartDom = chartRef.current!;
        const myChart = echarts.init(chartDom);

        const option: echarts.EChartsOption = {
            title : {
                //text: titleText,
            },
            series: {
                type: 'treemap',
                data: seriesData,

            },
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
    }, [titleText, seriesData]);

    return <div ref={chartRef} style={{ width: '100%', height: '100%' }} />;

};

export default TreeMapChart;
