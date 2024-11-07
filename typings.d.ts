import 'umi/typings';

declare namespace API {
    type BaseMessage = {
        code?: number;
        message?: string;
        data?: any;
    }

    type TChart = {
        chart_id: number;          // 图表ID
        create_time?: string;      // 创建时间
        chart_name?: string;       // 图表名称
        chart_type?: string;       // 图表类型
        labels?: string;           // 标签
        data_source_id?: number;   // 数据源ID
        query_sql?: string;        // 查询SQL
        chart_code: string;       // 图表代码
        sort?: number;             // 排序字段
        status?: number;           // 状态
    }

    type RCharts = {
        code?: number;
        message?: string;
        data: TChart[] ;
    }

    type TChartDatasets = {
        chart_datasets_id: number;    // 图表数据集 ID
        create_time?: string;         // 创建时间
        chart_id?: number;            // 图表 ID
        chart_type?: string;          // 图表类型
        column_name?: string;         // 列名称
        label?: string;               // 标签
        background_color?: string;    // 背景颜色
        border_color?: string;        // 边框颜色
        border_type?: string;         // 边框类型
        border_width?: number;        // 边框宽度
        column_data?: string;         // 列数据
        status?: number;              // 状态
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
