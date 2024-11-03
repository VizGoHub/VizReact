import request from 'umi-request';
import {API} from "../../typings";

export async function Chart(chartID: number, options?: { [key: string]: any }) {
    return request<{
        data: API.BaseMessage;
    }>(`/api/chart/${chartID}`, {
        method: 'GET',
        ...(options || {}),
    });
}


export async function Charts(options?: { [key: string]: any }) {
    return request<{
        data: API.BaseMessage;
    }>('/api/charts', {
        method: 'GET',
        ...(options || {}),
    });
}