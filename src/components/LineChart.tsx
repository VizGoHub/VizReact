import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

interface LineChartProps {
    titleText: string;
    legendData: string[];
    xAxisData: string[];
    seriesData: string[];
}

const LineChart: React.FC<LineChartProps> = ({ titleText, legendData, xAxisData, seriesData }) => {
    const chartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const chartDom = chartRef.current!;
        const myChart = echarts.init(chartDom);

        const option: echarts.EChartsOption = {
            title : {
                //text: titleText,
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: legendData,
            },
            xAxis : {
                type: 'category',
                boundaryGap: false,
                data: xAxisData,
                splitLine: {
                    show: true
                },
                axisLabel: {
                    //interval: 0, // 0 表示每个标签都显示
                    rotate: 45, // 标签旋转角度，宽度减少时会倾斜
                    formatter: (value: string) => {
                        return value.length > 16 ? value.slice(0, 16) + '...' : value;
                    }
                }
            },
            yAxis: {
                type: 'value',
            },
            series: seriesData,
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
    }, [titleText, legendData, xAxisData, seriesData]);

    return <div ref={chartRef} style={{ width: '100%', height: '100%' }} />;

};

export default LineChart;
