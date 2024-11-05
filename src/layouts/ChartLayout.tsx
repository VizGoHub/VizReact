import React, { useRef, useEffect, useState } from 'react';
import 'chart.js/auto';
import * as api from '@/services/api';
import LineChart from "@/components/LineChart";
import LineChartLayout from "@/layouts/LineChartLayout";
import TreeMapChart from "@/components/TreeMapChart";
import TreeMapChartLayout from "@/layouts/TreeMapChartLayout";

const ChartLayout = ({ chartID, chartType}: { chartID: number, chartType: string }) => {
    if(chartType == "line"){
        return <LineChartLayout chartID={chartID}  />;
    }

    if(chartType == "treemap"){
        return <TreeMapChartLayout chartID={chartID}  />;
    }
    return (<></>);
};

export default ChartLayout;
