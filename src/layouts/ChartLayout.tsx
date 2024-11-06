import React, { useRef, useEffect, useState } from 'react';
import 'chart.js/auto';
import LineChartLayout from "@/layouts/LineChartLayout";
import TreeMapChartLayout from "@/layouts/TreeMapChartLayout";
import BarChartLayout from "@/layouts/BarChartLayout";

const ChartLayout = ({ chartID, chartType}: { chartID: number, chartType: string }) => {
    if(chartType == "line"){
        return <LineChartLayout chartID={chartID}  />;
    }

    if(chartType == "treemap"){
        return <TreeMapChartLayout chartID={chartID}  />;
    }

    if(chartType == "bar"){
        return <BarChartLayout chartID={chartID}  />;
    }
    return (<></>);
};

export default ChartLayout;
