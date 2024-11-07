import 'umi/typings';

declare namespace API {
    type TChart = {
        chart_id: number;
        create_time?: number;
        chart_name?: string;
        chart_type?: string;
        labels?: string;
        data_source_id?: number;
        query_sql?: string;
        chart_code: string;
        sort?: number;
        status?: number;
    }

    type RCharts = {
        code?: number;
        message?: string;
        data: TChart[] ;
    }

    type TChartDatasets = {
        chart_datasets_id: number;
        create_time?: number;
        chart_id?: number;
        chart_type?: string;
        column_name?: string;
        label?: string;
        column_data?: string;
        status?: number;
    }

    type RChartDatasets = {
        code?: number;
        message?: string;
        data?: TChartDatasets;
    }

    type TChartData = {
        name: string;
        chart: TChart;
        datasets: TChartDatasets[];
    }

    type RChartData = {
        code?: number;
        message?: string;
        data: TChartData ;
    }
}
