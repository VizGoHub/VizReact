import request from 'umi-request';
import {API} from "../../typings";

export async function Charts(options?: { [key: string]: any }) {
    return request<API.RCharts>('/api/charts', {
        method: 'GET',
        ...(options || {}),
    });
}

export async function ChartData(chartID: number, options?: { [key: string]: any }) {
    return request<API.RChartData>(`/api/chartData/${chartID}`, {
        method: 'GET',
        ...(options || {}),
    });
}

export async function UpdateChart(options?: { [key: string]: any }) {
    return request<API.RChartData>(`/api/updateChart`, {
        method: 'POST',
        ...(options || {}),
    });
}